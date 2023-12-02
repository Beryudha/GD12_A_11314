import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";

const FormDataMakanan = () => {
    // menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();
    
    //membuat state array
    const [data, setData] = useState([]);

    // membuat state menu 
    const [menu, setMenu] = useState({ 
        nama: "", 
        kategori: "",
        harga: "",
        deskripsi: ""
    });
    
    // mengubah state menu sesuai dengan inputan
    const handleChange = (event) => { 
        const { name, value } = event.target; 
        setMenu({ ...menu, [name]: value }); 
    };
    
    // menghandle submit form
    const handleSubmit = (event) => { 
        event.preventDefault();

        // validasi inputan
        if (menu.nama === "" || menu.kategori === "" || menu.harga === "" || menu.deskripsi === "") { 
            toast.error("Semua Form harus diisi!"); 
            return;
        } else {
            //menggunakan operator spread untuk menggabungkan data user yang ada distate, dengan data baru loginAt 
            const newData = [...data];
            newData.push(menu);
            setData(newData);

            //localStorage.setItem("data", JSON.stringify(newData)); //menyimpan data newUser di localstorage 
            toast.success("Berhasil Tambah Data Makanan " + menu.kategori + "!"); 
            
        }

        setMenu({
            nama: "",
            kategori: "",
            harga: "",
            deskripsi: ""
        });
    };  

    return (
        <>
            
        </>
    );

};

export default FormDataMakanan;