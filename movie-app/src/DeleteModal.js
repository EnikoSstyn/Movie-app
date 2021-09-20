

export default function DeleteModal({ handleDeleteOnclick}) {

    return (
       


<div className="py-2">
<div className="modal fade" id="myModal" tabIndex="-1" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Törlés</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          <p>Are you sure you want to delete?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" className="btn btn-danger" onClick={handleDeleteOnclick} >Delete</button>
      </div>
    </div>
  </div>
</div>
</div>
    )
}
