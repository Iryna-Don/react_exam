import Joi from "joi";
import { searchSliceActions } from "../searchSlice.ts";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button.tsx";
import styles from "./searchBar.module.css";

const schema = Joi.object({
    searchQuery: Joi.string().required().messages({
        'string.empty': 'This field cannot be empty \nEnter your query or click the "Reset" button',
        'any.required': 'This field is required',
    }),
});

interface IFormValues {
    searchQuery: string;
}

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormValues>({
        resolver: joiResolver(schema),
    });

    const onSubmit = (data: IFormValues) => {
        dispatch(searchSliceActions.setSearchQuery(data.searchQuery));
        dispatch(searchSliceActions.setSearchPage(1));
        navigate('/movies');
    };

    const handleReset = () => {
        reset({ searchQuery: '' });
        dispatch(searchSliceActions.setSearchQuery(''));
        navigate('/movies');
    };

    return (
        <form className={'rowContainer'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div><input
                className={styles.inputStyled}
                type="text"
                {...register('searchQuery')}
                placeholder="Search for a movie"
            />

                {errors.searchQuery && (
                    <p className={'error'}>{errors.searchQuery.message}</p>
                )}</div>

                <Button
                    title="Search"
                    type="submit"
                />
                <Button
                    title="Reset"
                    type="button"
                    func={handleReset}
                />
        </form>
    );
};

export default SearchBar;
