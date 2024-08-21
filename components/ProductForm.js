import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({_id,title:existingTitle,description:existingDescription,price:existingPrice,images:existingImages}){

    const [title,setTitle] = useState(existingTitle || '');
    const [images,setImages] = useState(existingImages || []);
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [goToProducts,setGoToProducts] = useState(false);
    const [isUploading,setIsUploading]=useState(false);
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title,description,price,images};
        if(_id){
            await axios.put('/api/products',{...data,_id})
            .then((response)=>alert("le produit est modifie"))
            .catch((error)=>alert(error))
        }else{
            await axios.post('/api/products', data)
            .then((response)=>alert("le produit est ajoute"))
            .catch((error)=>alert(error))
        }
        setGoToProducts(true);
    }
    if (goToProducts){
         router.push('/Products')
    }


    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading (true);
            const data = new FormData();
            for (const file of files) {
                data.append('file',file);
            }
            const res = await axios.post('/api/upload',data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false)
        }
    }

    function updatedImagesOrder(images){
        setImages(images)
    }
   

    return(
            <form onSubmit ={saveProduct}>

                <label className="this">Product name</label>
                <input 
                    className="this"
                    type="text" 
                    placeholder="Product name" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    required
                />


                <label className="this">Photos</label>
                <div className="mb-2 flex flex-wrap gap-2 overflow-x-scroll bg-red-300">

                    <label className="w-24 h-24 border flex justify-center rounded-lg flex-col items-center text-sm text-gray-500 hover:text-gray-900 bg-slate-200 hover:bg-slate-100 cursor-pointer">   
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload
                        {!images?.length && (
                        <div className="pt-2 text-xs text-center">No images for this Product</div>
                         )}
                        <input type="file" onChange={uploadImages} className="hidden"></input>
                    </label>

                    <ReactSortable
                        list={images} 
                        className="flex flex-wrap gap-1"
                        setList={updatedImagesOrder}>

                            {!!images?.length && images.map(link =>(
                                <div key={link} className="h-24 bg-slate-400 rounded-lg">
                                    <img src={link} alert="produit " className="h-full rounded-lg"></img>
                                </div>
                            ) )}
                    </ReactSortable>

                    {isUploading && (
                        <div className="flex justify-center items-center rounded-lg w-24 h-24">
                            <Spinner color="#00FF00" speed ={2} size = "60px"/> {/*color must be hexa code exp: "#00FF00" */}
                        </div>
                    )}

                </div>


                <label className="this">Description</label>
                <textarea  
                    className="this"
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />

                <label className="this">Price</label>
                <input 
                    className="this"
                    type="number" 
                    placeholder=" Price" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)}
                    required
                />

                <button 
                type="submit" 
                className="btn-primary">Save</button>
            </form>
        
    );
}