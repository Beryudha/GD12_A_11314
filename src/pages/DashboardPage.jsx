import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form} from "react-bootstrap";
import { toast } from "sonner";

//mengimport gambar
import imgProfile from "../assets/images/cat.jpg";
import appetizer from "../assets/images/appetizer.jpg"
import maincourse from "../assets/images/MainCourse.jpg"
import dessert from "../assets/images/desserts.jpg"

//import icon
import { FaPlusSquare } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const DashboardPage = () => {
    //menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();
    
    //mengambil data user dari localstorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    //menghandle jika user belum login
    useEffect(() => { 
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    //mengubah format tanggal
    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    // 3 const ke bawah Buat buka/tutup Modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setUpdate(null);
        setMenu({
            nama: "",
            kategori: "",
            harga: "",
            deskripsi: "",
        });
    };
    const handleShow = () => setShow(true);

    //membuat state array untuk list menu
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
            //menggunakan operator spread untuk menggabungkan data yang ada distate, dengan data baru
            const newData = [...data];
            newData.push(menu);
            setData(newData);

            toast.success("Berhasil Tambah Data Makanan " + menu.kategori + "!"); 
            
            //localStorage.setItem("data", JSON.stringify(newData)); //menyimpan data newUser di localstorage 
            setShow(false);

            setMenu({
                nama: "",
                kategori: "",
                harga: "",
                deskripsi: ""
            });
        }
        setMenu({
            nama: "",
            kategori: "",
            harga: "",
            deskripsi: ""
        });
    };  

    const [update, setUpdate] = useState(null);
    // buka menu edit
    const handleUpdate = (index) => {
        setUpdate(index);
        // buat buka modal edit
        setShow(true);
    };
    
    // buat update
    const updateData = (event) => {
        event.preventDefault();

        // Validasi inputan
        if (menu.nama === "" || menu.kategori === "" || menu.harga === "" || menu.deskripsi === "") {
          toast.error("Semua Form harus diisi!");
          return;
        } else {
          
            const updatedData = [...data];
            updatedData[update] = menu;
      
            setData(updatedData);
            toast.success("Menu berhasil diperbarui!");
      
          // localStorage.setItem("data", JSON.stringify(newData)); // Menyimpan data newUser di localstorage
          
          // Reset the menu state
          setMenu({
            nama: "",
            kategori: "",
            harga: "",
            deskripsi: ""
          });
          
          // Nutup modal
          setShow(false);
          setUpdate(null);
        }
      };

    // buat delete
    const handleDelete = (index) => {

        const newData = [...data];

        newData.splice(index, 1);

        setData(newData);
    }

    return (
        <>
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img src={imgProfile} className="img-fluid rounded" alt="Tidak Ada Gambar" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h1 className="mb-3 border-bottom fw-bold">Daftar Menu Makanan</h1>
            <p className="mb-3">Grand Atma memiliki <strong>{data.length}</strong> daftar menu makanan yang bisa dipesan.</p>
            <Button className="mb-3" variant="success" onClick={handleShow}>
                <FaPlusSquare /> Tambah Menu
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {update !== null
                        ? <Modal.Title>Edit Menu</Modal.Title>
                        : <Modal.Title>Tambah Menu</Modal.Title>
                    }
                </Modal.Header>

                <Modal.Body>
                    <Form style={{ maxWidth: "700px", margin: "auto" }}>
                        <h6>Nama Makanan</h6>
                        <Form.Control 
                            type="text" 
                            placeholder={update !== null
                                            ? data[update].nama
                                            : ""} 
                            name="nama" 
                            onChange={handleChange} />

                        <br />

                        <h6>Kategori</h6>
                        <Form.Select name="kategori" onChange={handleChange}>
                            <option value={("")}>{update !== null
                                                        ? data[update].kategori
                                                        : "Pilih Kategori"} </option>
                            <option value="Appetizers">Appetizers</option>
                            <option value="Main Courses">Main Courses</option>
                            <option value="Desserts">Desserts</option>
                        </Form.Select>
                        
                        <br />

                        <h6>Harga</h6>
                        <Form.Control 
                            type="number" 
                            placeholder={update !== null
                                                ? data[update].harga
                                                : ""} 
                            name="harga" 
                            onChange={handleChange}/>
                        
                        <br />

                        <h6>Deskripsi</h6>
                        <Form.Control as="textarea" 
                            placeholder={update !== null
                                                ? data[update].deskripsi
                                                : ""}  
                            name="deskripsi" 
                            onChange={handleChange}/>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Batal
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={update !== null ? updateData : handleSubmit}>
                        <FaSave /> Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                {data.map((item, index) => (
                <Card key={item.id} className="mb-3">
                    <Row>
                        <Col md={2}>
                            <Card.Body>
                                {item.kategori === "Appetizers" 
                                    ? <img src={appetizer} className="img-fluid rounded" alt="Tidak Ada Gambar" width={300} height={300} />

                                    : item.kategori === "Main Courses" 
                                        ? <img src={maincourse} className="img-fluid rounded" alt="Tidak Ada Gambar" width={300} height={300} />

                                        : <img src={dessert} className="img-fluid rounded" alt="Tidak Ada Gambar" width={300} height={300} />
                                }
                                
                            </Card.Body>
                        </Col>

                        <Col>
                            <Card.Body className="mb-3 border-bottom">
                                <Card.Title>{item.nama}</Card.Title>
                                    <p>
                                        {item.deskripsi}
                                    </p>
                            </Card.Body>

                            <Card.Body>
                                <Row>
                                    <p> Kategori: <strong>{item.kategori}</strong> | Harga: <strong>Rp {item.harga}</strong>  </p>
                                    <Col md={2}>
                                        <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                            <FaTrashAlt /> Hapus Menu
                                        </Button>                                
                                    </Col>
                                    <Col>
                                        <Button variant="primary" onClick={() => handleUpdate(index)}>
                                            <BsPencilSquare /> Edit Menu
                                        </Button>
                                    </Col>
                                </Row>
                                
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                ))}
            </div>
        </Container>
        </>
    );
};

export default DashboardPage;