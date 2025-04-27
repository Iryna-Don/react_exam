export interface IUserResponse {
    avatar: {
        gravatar: {
            hash: string;
        },
        tmdb: {
            avatar_path: null | string;
        };
    };
    id: number;
    include_adult: boolean;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    username: string;
}