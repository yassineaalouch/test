import Layout from "@/components/Layout";
// import TableShow from "@/components/TableShow";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesPage(){

    const [name,setName]= useState('')
    const [categories,setCategories]= useState([]);
    const [parentCategory, setParentCategory] = useState('');

    useEffect(() => {
        fetchCategories() 
    },[]);

    function fetchCategories(){
        axios.get('/api/categories').then(result=>{
            setCategories(result.data);
         });
    }

    async function saveCategory(ev){
        ev.preventDefault();
        await axios.post('/api/categories', {name,parentCategory});
        setName('');
        fetchCategories()
    }

    return(
        <Layout>
            <h1 className="this">Categories</h1>
            <label className="this">New Category name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    type="text"
                    className="this !mb-0 "
                    placeholder={"Category name"}
                    onChange={ev => setName(ev.target.value)}
                    value={name}/>

                <select 
                    className="this !mb-0" 
                    value={parentCategory} 
                    onChange={ev => setParentCategory(ev.target.value)}>
                        <option value=""> No parent category </option>
                        {categories.length > 0 && categories.map(category=> (
                            <option value={category._id}>{category.name} </option>
                        ))}
                </select>

                <button type="submit" className="btn btn-primary py-1">Save</button>
            </form>
          
            <table className="basic">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>parent Category name</td>
                    </tr>
                </thead>
                <tbody>

                    {categories.length > 0 && categories.map(category=> (
                        <tr key={category.name}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <Link href={'/category/edit/'+category.name}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-5">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                 Edit
                                </Link>
                            </td>
                            <td>
                                <Link href={'/category/delete/'+category.name}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                 Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}