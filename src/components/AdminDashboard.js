import React, { useState, useSyncExternalStore } from "react";
import "./AdminDashboard.css";
import ModalforLogout from "./ModalforLogout";
import "./CategoryTable.css";

const AdminDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [status, setstatus] = useState("status");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryStatus, setNewCategoryStatus] = useState("status");

  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [mrp, setMrp] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [status1, setStatus1] = useState("status");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Amul Tazza",
      packSize: "200 ml",
      category: "Milk",
      mrp: "Rs.27",
      image: "https://example.com/amul-tazza.png",
      status: "Active",
    },
    {
      id: 2,
      name: "Cadbury Crème",
      packSize: "200 ml",
      category: "Milk",
      mrp: "Rs.27",
      image: "https://example.com/cadbury-creme.png",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Strkist Apple",
      packSize: "1 kg",
      category: "Fruits",
      mrp: "Rs.249",
      image: "https://example.com/strkist-apple.png",
      status: "Active",
    },
  ]);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Milk",
      description: "Lorem ipsum is simply dummy text",
      status: "Active",
    },
    {
      id: 2,
      name: "Fruits",
      description: "Lorem ipsum is simply dummy text",
      status: "Active",
    },
    {
      id: 3,
      name: "Vegetables",
      description: "Lorem ipsum is simply dummy text",
      status: "Inactive",
    },
  ]);

  const handleLogOutClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmLogOut = () => {
    console.log("User confirmed log out");
    setIsModalVisible(false);
  };

  const handleSidebarClick = (section) => {
    setActiveSection(section);
    if (section !== "category") {
      setIsAddNewVisible(false);
    }
  };

  const handleAddNewClick = () => {
    setIsAddNewVisible(!isAddNewVisible);
  };
  const handlechangestatus = (e) => {
    setstatus(e.target.value);
  };

  const handlesavenewcategory = (e) => {
    e.preventDefault();
    if (
      newCategoryName &&
      newCategoryDescription &&
      newCategoryStatus !== "status"
    ) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        description: newCategoryDescription,
        status: newCategoryStatus,
      };

      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryStatus("status");
      setIsAddNewVisible(false);
    }
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();

    if (productName && packSize && mrp && status1 !== "status") {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        packSize: packSize,
        category: categoryName,
        mrp: `Rs.${mrp}`,
        image: productImage ? URL.createObjectURL(productImage) : "N/A",
        status: status1,
      };

      
      setProducts([...products, newProduct]);

      
      setCategoryName("");
      setProductName("");
      setPackSize("");
      setMrp("");
      setProductImage(null);
      setStatus1("status");
      
      setIsAddNewVisible(false);
    }
  };
  return (
    <div className="AdminDashboard-container">
      <header className="header">
        <div className="logo">
          <img src="../src/Images/digitalflake_logo.png" alt="Digital Lake" />
        </div>
        <button className="logout-btn" onClick={handleLogOutClick}>
          Log Out
        </button>
      </header>

      <div className="sidebarnav">
        <nav className="sidebar">
          <ul>
            <li>
              <a
                href="#"
                className={activeSection === "home" ? "active" : ""}
                onClick={() => handleSidebarClick("home")}
              >
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeSection === "category" ? "active" : ""}
                onClick={() => {
                  handleSidebarClick("category");
                  setIsAddNewVisible(false);
                }}
              >
                <i className="fas fa-list"></i> Category
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeSection === "products" ? "active" : ""}
                onClick={() => handleSidebarClick("products")}
              >
                <i className="fas fa-box"></i> Products
              </a>
            </li>
          </ul>
        </nav>

        <main className="main-content rightside">
          {activeSection === "home" && (
            <>
              <h1>Welcome to Digitalflake Admin</h1>
              <img
                src="https://t4.ftcdn.net/jpg/05/55/71/83/240_F_555718315_XAi4cgO4s2uBRshlJZ8wXjAWkptX8023.jpg"
                alt="Welcome Image"
              />
            </>
          )}

          {activeSection === "category" && (
            <>
              <div className="table-header">
                <h2>Category Section</h2>
                <button className="add-new-btn" onClick={handleAddNewClick}>
                  {isAddNewVisible ? "Back to Table" : "Add New"}
                </button>
              </div>

              {isAddNewVisible ? (
                <div className="add-new-form">
                  <h3>Add New Category</h3>
                  <form onSubmit={handlesavenewcategory}>
                    <div className="form-group">
                      <input
                        style={{ margin: "5px", padding: "5px" }}
                        type="text"
                        name="category"
                        placeholder="Category Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                      <input
                        style={{ margin: "5px", padding: "5px" }}
                        type="text"
                        name="description"
                        value={newCategoryDescription}
                        onChange={(e) =>
                          setNewCategoryDescription(e.target.value)
                        }
                        placeholder="Enter Description"
                      />

                      <select
                        value={status}
                        onChange={(e) => setNewCategoryStatus(e.target.value)}
                        style={{ height: "30px", width: "70px" }}
                      >
                        <option value="status" disabled hidden>
                          status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        marginTop: "325px",
                      }}
                    >
                      <button
                        style={{
                          margin: "0 5px",
                          padding: "5px 10px",
                          backgroundColor: "lightgray",
                        }}
                        onClick={() => setIsAddNewVisible(false)}
                        type="button"
                      >
                        Cancel
                      </button>

                      <button
                        style={{
                          margin: "0 5px",
                          padding: "5px 10px",
                          backgroundColor: "green",
                          color: "white",
                        }}
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="category-table">
                  <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>{category.description}</td>
                          <td>
                            <span
                              className={`status ${category.status.toLowerCase()}`}
                            >
                              {category.status}
                            </span>
                          </td>
                          <td>
                            <button className="action-btn">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="action-btn"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {activeSection === "products" && (
            <>
              <div className="table-header">
                <h2>products</h2>
                <button className="add-new-btn" onClick={handleAddNewClick}>
                  {isAddNewVisible ? "Back to Table" : "Add New"}
                </button>
              </div>

              {isAddNewVisible ? (
                <div className="add-new-form1">
                  <h3>Add New product</h3>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group-row1">
                      <input
                        type="text"
                        name="category"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                      <input
                        type="text"
                        name="product_name"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                      <input
                        type="number"
                        name="pack_size"
                        placeholder="Pack Size"
                        value={packSize}
                        onChange={(e) => setPackSize(e.target.value)}
                      />
                    </div>

                    <div className="form-group-row">
                      <input
                        type="number"
                        name="mrp"
                        placeholder="MRP"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                      />
                      <div className="input-wrapper1">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                        <i className="fas fa-arrow-up icon-right"></i>{" "}
                        
                      </div>
                      <select
                        value={status}
                        onChange={(e) => setStatus1(e.target.value)}
                      >
                        <option value="status" disabled hidden>
                          Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="form-actions">
                      <button type="button">Cancel</button>
                      <button type="submit">Save</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="category-table">
                  <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>pack size</th>
                        <th>category</th>
                        <th>mrp</th>
                        <th>image</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.packSize}</td>
                          <td>{product.category}</td>
                          <td>{product.mrp}</td>
                          <td>{product.image}</td>

                          <td>
                            <span
                              className={`status ${product.status.toLowerCase()}`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <button className="action-btn">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="action-btn"
                              onClick={() => handleDeleteCategory(product.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <ModalforLogout
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogOut}
      />
    </div>
  );
};

export default AdminDashboard;
