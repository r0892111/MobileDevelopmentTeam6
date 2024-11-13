// import { ErrorsEnum } from '@enums/errors-enums';
// import ApiError from '../error-management/api-error';
// import { FilterConfigs, FilterType } from './types/filter';

export const parseFilterParams = (): void => {};

// export const parseFilterParams = ( // TODO : adapter pour fastify
//   queryParams: any,
//   filterConfigs: FilterConfigs,
// ): { [key: string]: any } => {
//   try {
//     const filters = {};

//     if (!queryParams) {
//       return filters;
//     }

//     Object.entries(filterConfigs).forEach(([key, config]) => {
//       const queryParamKey = `filter${key.charAt(0).toUpperCase()}${key.slice(1)}`;

//       if (!queryParams[queryParamKey]) {
//         return;
//       }

//       const filter = JSON.parse(queryParams[queryParamKey]);

//       switch (config.type) {
//         case FilterType.ENUM: {
//           filters[key] = { in: filter };
//           break;
//         }
//         case FilterType.DATE: {
//           const dateRange = filter;

//           if (!Array.isArray(dateRange) || dateRange.length !== 2) {
//             throw new ApiError('Invalid query param: dateRange is not array', 400, ErrorsEnum.invalidQueryParameter);
//           }

//           const start = dateRange[0];
//           const end = dateRange[1];

//           if (start && start.length > 0) {
//             const startDate = new Date(start);
//             filters[key] = { ...filters[key], gte: startDate };
//           }
//           if (end && end.length > 0) {
//             const endDate = new Date(end);
//             filters[key] = { ...filters[key], lte: endDate };
//           }
//           break;
//         }
//         case FilterType.ID:
//           filters[key] = { in: filter.map(Number) };
//           break;
//         case FilterType.IDS:
//           filters[key] = { some: { id: { in: filter.map(Number) } } };
//           break;
//         case FilterType.INNER_ID:
//           if (!filters[config.innerTable]) {
//             filters[config.innerTable] = {};
//           }
//           filters[config.innerTable][key] = { in: filter.map(Number) };
//           break;
//         default:
//           throw new ApiError('Invalid filter type', 400, ErrorsEnum.invalidQueryParameter);
//       }
//     });

//     return filters;
//   } catch (error) {
//     console.error('error:', error);
//     if (error instanceof ApiError) throw error;
//     throw new ApiError('Invalid filter parameter', 400, ErrorsEnum.invalidQueryParameter);
//   }
// };

// export const parseFilterParamsForDynamo = (queryParams: Record<string, any>, filterConfigs: FilterConfigs): any => {
//   try {
//     const filters = {};

//     if (!queryParams) {
//       return filters;
//     }

//     Object.entries(filterConfigs).forEach(([key, config]) => {
//       const queryParamKey = `filter${key.charAt(0).toUpperCase()}${key.slice(1)}`;

//       if (!queryParams[queryParamKey]) {
//         return;
//       }

//       switch (config.type) {
//         case FilterType.ENUM: {
//           filters[key] = config.enum[queryParams[queryParamKey]];
//           break;
//         }
//         default:
//           throw new ApiError('Invalid filter type', 400, ErrorsEnum.invalidQueryParameter);
//       }
//     });

//     return filters;
//   } catch (error) {
//     console.error('error:', error);
//     if (error instanceof ApiError) throw error;
//     throw new ApiError('Invalid filter parameter', 400, ErrorsEnum.invalidQueryParameter);
//   }
// };
