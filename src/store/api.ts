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
			// For demo purposes, manually handle the pagination since the API doesn't support skip
			transformResponse: (response: Product[], meta, { limit = 10, skip = 0 }) => {
				const result = Array.isArray(response) ? response : [];
				return result.slice(skip, skip + limit);
			},
			// Merge results for infinite scrolling
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			merge: (currentCache, newItems) => {
				if (!currentCache) return newItems;
				// Check if we already have these items to avoid duplicates
				const uniqueNewItems = newItems.filter(newItem => !currentCache.some(item => item.id === newItem.id));
				return [...currentCache, ...uniqueNewItems];
			},
			// Always get a fresh result when forceRefetch is true
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
