import SpinnerLoader from "@/components/loaders/spinner-loader";
import { appConfig } from "@/config";
import { apiEndpoints } from "@/constants/api.endpoints";
import { useAxiosFetcher } from "@/lib/hooks/use-axios-fetcher";
import { useErrorHandler } from "@/lib/hooks/use-error-handler";

export default function ShowUser({ userId }: { userId: string | number }) {
  const { handleError } = useErrorHandler();
  const { data, error, isLoading } = useAxiosFetcher<IUser>(
    `${appConfig.apiBaseUrl}${apiEndpoints.users.user(userId)}`
  );

  if (isLoading) return <SpinnerLoader />;
  if (error) <>{handleError(error)}</>;
  return <p>{data?.username}</p>;
}
