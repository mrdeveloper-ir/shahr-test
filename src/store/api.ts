import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, User } from '@/shared/types';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
	endpoints: builder => ({
		getProducts: builder.query<Product[], { limit?: number; skip?: number }>({
			query: ({ limit = 10, skip = 0 }) => ({
				url: '/products',
				params: { limit, skip },
			}),
			transformResponse: (response: Product[], _, { limit = 10, skip = 0 }) => {
				const result = Array.isArray(response) ? response : [];
				return result.slice(skip, skip + limit);
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			merge: (currentCache, newItems) => {
				if (!currentCache) return newItems;
				const uniqueNewItems = newItems.filter(newItem => !currentCache.some(item => item.id === newItem.id));
				return [...currentCache, ...uniqueNewItems];
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
		}),
		getUsers: builder.query<User[], void>({
			query: () => '/users',
		}),
		getUserById: builder.query<User, number>({
			query: id => `/users/${id}`,
		}),
	}),
});

export const { useGetProductsQuery, useGetUsersQuery, useGetUserByIdQuery } = api;
