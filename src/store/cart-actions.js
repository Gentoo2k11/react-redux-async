import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const url = 'https://react-http-20803-default-rtdb.firebaseio.com/cart.json';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        }
        
            try {
                const cartData = await fetchData();
                dispatch(cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity
                }));
            }
            catch(error)
            {
                dispatch(uiActions.showNotofication({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!'
                }));
            }
    };
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotofication({
            status: 'pending',
            title: 'sending',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {

            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotofication({
                status: 'success',
                title: 'Success!',
                message: 'Sending cart data successfully!'
            }));

        } catch (error) {
            dispatch(uiActions.showNotofication({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }
    }
};

