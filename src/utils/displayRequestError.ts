import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

const displayRequestError = (enqueueSnackbar: (
  message: SnackbarMessage, options?: (OptionsObject | undefined)
) => SnackbarKey, e: any, fallbackMessage: string): void => {
  enqueueSnackbar(
    e?.response?.data?.errors
      ? Object.values(e.response.data.errors).join('; \n')
      : (e?.response?.data?.message || e?.response?.data?.error || fallbackMessage),
    {
      variant: 'error',
    },
  );
};

export default displayRequestError;
