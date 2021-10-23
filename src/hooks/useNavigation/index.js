import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function useNavigation() {
  const history = useHistory();

  const navigateTo = useCallback(
    (navigationProps) => {
      if (typeof navigationProps === "string") {
        history.push({
          pathname: navigationProps,
          search: history.location.search,
        });
      } else {
        const { pathname, search, state = {} } = navigationProps;
        history.push({
          pathname,
          state,
          search: search || history.location.search,
        });
      }
    },
    [history],
  );

  function navigateBack() {
    history.goBack();
  }

  const navigationObject = {
    navigateTo,
    navigateBack,
    history,
  };

  return navigationObject;
}
