import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorString = error.toString();

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <br />
      {errorString.includes("error loading dynamically imported module") ? (
        <p>
          <b>
            Your error is probably due to an outdated version trying to be
            loaded. Please reload the page a few times, this should fix the
            error.
          </b>
        </p>
      ) : (
        <p>
          Please copy the following and email it to me (piero@piemadd.com) so I
          can debug and fix the issue.{" "}
          <b>
            There is a chance your issue is already fixed. Try realoding a few
            times to see if that fixes the issue.
          </b>
        </p>
      )}
      <p>
        <i>
          Current path: {window.location.href}
          <br />
          Current version: v0.0.1 Beta
          <br />
          Current date and time (UTC): {new Date().toUTCString()}
          <br />
          Current date and time (local): {new Date().toLocaleString()}
          <br />
          {error.toString()}
        </i>
      </p>
    </div>
  );
}
