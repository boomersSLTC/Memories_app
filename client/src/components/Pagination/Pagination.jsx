import React, {useEffect} from "react";
import { Pagination,PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import usestyles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getPosts} from '../../actions/posts';


const Paginate = ({page}) => {
    const {numberOfPages} = useSelector((state) => state.posts);
    const classes = usestyles();
    const dispatch = useDispatch();
    
    useEffect(() => { // Create a useEffect hook.
        if(page) dispatch(getPosts(page));// Dispatch an action to get the posts.
      },[page]); // Set the dependency array to the dispatch function.
      
    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}//no. of pages
            page={Number(page) || 1}
            variant="outlined"
            renderItem={(item) => (
                <PaginationItem 
                    {...item}
                    component={Link}
                    to= {`/posts?page=${item.page}`}
                />
            )}
        /> 
    )
}

export default Paginate;