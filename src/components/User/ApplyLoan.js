import React from "react";
import "../../styles/Home.css";
import UserSidebar from "./Sidebar";

export default function ApplyLoan() {
  const [formData, setFormData] = useState({
    employeeId: "",
    itemCategory: "Electronics",
    itemDescription: "",
    itemValue: "",
    itemMake: "",
  });

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [err, setErr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const item = location.state;

    if (item) {
      setFormData({
        employeeId: item.employeeId,
        itemCategory: item.itemCategory,
        itemDescription: item.itemDescription,
        itemMake: item.itemMake,
        itemValue: item.itemValue,
      });
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await fetch(SERVER_URL + Url.APPLY_LOAN, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        if (data != null) {
          setAlertMessage(data);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        } else {
          setAlertMessage("Unable to apply for loan");
          setTimeout(() => {}, 100);
          setAlert(true);
          setErr(true);
        }
      });
    setFormData({
      employeeId: item.employeeId,
      itemCategory: item.itemCategory,
      itemDescription: item.itemDescription,
      itemMake: item.itemMake,
      itemValue: item.itemValue,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container ">
      <UserSidebar activeLink="applyLoan" />
      {/* <div>ApplyLoan</div> */}
      <h2 className="mb-0">Add Item</h2>
      <p style={{ color: "grey" }}>Add an item to the catalogue</p>
      {alert && (
        <div
          className={err ? "alert alert-danger" : "alert alert-success"}
          role="alert"
        >
          {alertMessage}
        </div>
      )}
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                type="text"
                name="itemId"
                value={formData.itemId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Category</Form.Label>
              <Form.Select
                aria-label="itemCategory"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleInputChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Automobiles">Automobiles</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                type="text"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Make</Form.Label>
              <Form.Control
                type="text"
                name="itemMake"
                value={formData.itemMake}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Item Valuation</Form.Label>
              <Form.Control
                type="number"
                name="itemValuation"
                value={formData.itemValuation}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <Button type="submit">Add Data</Button>
      </Form>
    </div>
  );
}
