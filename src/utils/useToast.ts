export function useToast() {
  return (detail: ShowToastEventDetail) => {
    document.dispatchEvent(
      new CustomEvent<ShowToastEventDetail>('showtoast', {
        detail,
      }),
    );
  };
}
