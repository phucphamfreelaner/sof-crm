import { lazy, Suspense } from "react";

const LazyRoute = (props: any) => {
  const Login = lazy(() => import(props.path));
  return (
    <Suspense fallback={<div>111</div>}>
      <Login {...props} />
    </Suspense>
  );
};
