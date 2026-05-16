function DeleteConfirmDialog({ title, message, onConfirm, onCancel }) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>{title}</h2>
                <p>{message}</p>

                <div style={footerStyle}>
                    <button style={cancelButtonStyle} onClick={onCancel}>
                        No
                    </button>

                    <button style={deleteButtonStyle} onClick={onConfirm}>
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const modalStyle = {
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    width: "460px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const footerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
};

const cancelButtonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#6b7280",
    color: "white",
    cursor: "pointer",
};

const deleteButtonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
};

export default DeleteConfirmDialog;