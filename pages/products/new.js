import Layout from "../../components/Layout";
import ProductForm from "@/components/ProductForm";


export default function NewProduct(){
    return (
    <Layout>
        <h1 className="this">add product</h1>
        <ProductForm/>
    </Layout>
    );
}