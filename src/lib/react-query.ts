import axios, { AxiosError } from 'axios';
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions, QueryCache } from '@tanstack/react-query';
import { PromiseValue } from 'type-fest';
import toast from 'react-hot-toast';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  },
};

export const queryClient = new QueryClient({ 
  defaultOptions: queryConfig, 
  queryCache: new QueryCache({
    onError: (error)=>{
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message)
        return
      }
      toast.error(error.message)
    }
  }) 
});

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;