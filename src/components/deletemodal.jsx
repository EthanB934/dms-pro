import { deleteDoor } from "../services/DoorServices/doors"

export const DeleteModal = ({door, onCancel, refetcher, showModal, token}) => {
    const handleDeleteDoor = () => {
        deleteDoor(door.id, token).then(refetcher)
        showModal(false)
    }

    return (
        <section className="delete-modal">
        <h2>Are you sure that you wish to delete this door?</h2>
            <div className="door">
                Total Shelves: {door.shelves} <br />
                Total Slots: {door.slots} <br />
                Type: {door.type.name}
            </div>
            <button onClick={handleDeleteDoor}>Confirm</button>
            <button onClick={onCancel}>Abort</button>
        </section>
    )
}