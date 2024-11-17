const Seat = () => {
    return (
        <div
            className="occasion__seats"
            style={{
                gridColumn: "1", // Default column position
                gridRow: "1"     // Default row position
            }}
        >
            1 {/* Static seat number */}
        </div>
    );
};

export default Seat;
