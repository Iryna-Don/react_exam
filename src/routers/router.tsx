import {createBrowserRouter} from 'react-router-dom';
import MoviesPage from "../feaches/movie/components/moviesPage/MoviesPage.tsx";
import Auth from "../feaches/auth/components/Auth.tsx";
import MoviesList from "../feaches/movie/components/MoviesList/MoviesList.tsx";
import AuthCallback from "../feaches/auth/components/AuthCallBack.tsx";
import MovieInfo from "../feaches/movie/components/movieInfo/MovieInfo.tsx";
import MovieListCard from "../feaches/movie/components/movieListCard/MovieListCard.tsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MoviesPage/>, children: [
            {
                index: true, element: <Auth/>,
            },
            {
                path: '/movies',
                element: (<MoviesList/>),
            },
            {
                path: '/movies/:id',
                element: (<MovieInfo/>),
            },
            {
                path: '/movies/:id/details',
                element: (<MovieListCard/>),
            },
        ],
    },
    {
        path: '/auth/callback', element: <AuthCallback/>,
    },
]);