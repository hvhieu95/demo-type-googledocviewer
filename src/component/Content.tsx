

type ContentType={
    comment:string,
    assign:string,
    status:string,
    onChangeComment:(comment:string)=>void,
    onChangeStatus:(status:string)=>void,
    onChangeAssign:(assign:string)=>void
}

const Content= ({ comment, assign, status, onChangeAssign, onChangeStatus, onChangeComment }:ContentType) => {
   


    return(
        <div className="container-content">
        <div className="container-content-text">
          <textarea value={comment} placeholder="Nhập thông tin ở đây"onChange={(e) => onChangeComment(e.target.value)}></textarea>
        </div>
        <div className="container-content-state">
          アサイン
          <select value={assign} onChange={(e)=>onChangeAssign(e.target.value)}>
          <option value="選択">選択</option>
            <option value="HOANG VAN HIEU">HOANG VAN HIEU</option>
            <option value="NGUYEN VAN DUNG">NGUYEN VAN DUNG</option>
            <option value="HUYNH TUAN THANH">HUYNH TUAN THANH</option>
            <option value="NGUYEN VAN VAN">NGUYEN VAN VAN</option>
            <option value="VO NHAT QUANG">VO NHAT QUANG</option>
          </select>
          ステータス
          <select value={status} onChange={(e)=>onChangeStatus(e.target.value)}>
          <option value="選択">選択</option>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </div>
      </div>
    )
}
export default Content;