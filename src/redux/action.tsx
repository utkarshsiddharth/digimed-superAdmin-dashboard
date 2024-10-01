/* eslint-disable linebreak-style */
export const ThemeChanger = (value: any) => async (dispatch: any) => {
  console.log("FOXCON", value);
  dispatch({
    type: "ThemeChanger",
    payload: value,
  });
};

export const AddToCart =
  (id: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: id,
    });
  };
export const ProductReduxData =
  (id: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "PRODUCT",
      payload: id,
    });
  };
