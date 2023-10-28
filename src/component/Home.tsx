import React from "react";
import { Link } from "react-router-dom";
import { useDocuments } from "../Context/DocumentContext";
import { DocumentType } from "../Data/documents";
const Home: React.FC = () => {
  const { documents } = useDocuments();

  return (
    <div className="home-container home-page">
      <h1 className="mb-4">Home</h1>
      <div className="list-file-content">
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">名ファイル</th>
              <th scope="col">アサイン</th>
              <th scope="col">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc: DocumentType) => (
              <tr key={doc.id} className="list-file">
                <td>
                  <Link
                    to={`/document/${doc.id}`}
                    className="text-decoration-none"
                  >
                    {doc.name}
                  </Link>
                </td>
                <td> {doc.assign || " 未指定"}</td>
                <td>{doc.status || "未確認"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
