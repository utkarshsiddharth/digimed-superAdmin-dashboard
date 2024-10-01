import { useState } from "react";
import { Col, Row } from "react-bootstrap";

const Editor = () => {
  const [content, setContent] = useState<string>("");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState(false); // Corrected typo here
  const [isUnderline, setIsUnderline] = useState(false);
  const [istextCenter, setIsTextCenter] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isLeft, setIsLeft] = useState(false);

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };
  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };
  const handleunderlineClick = () => {
    setIsUnderline(!isUnderline);
  };
  const handcenterClick = () => {
    setIsTextCenter(!istextCenter);
  };
  const handRightClick = () => {
    setIsRight(!isRight);
  };
  const handleftClick = () => {
    setIsLeft(!isLeft);
  };

  return (
    <div className="">
      <div className="m-3 border rounded" style={{ height: "220px" }}>
        <Row>
          <Col>
            <div className="editorhaeder border-bottom d-flex">
              <div style={{ fontSize: "30px" }} className="px-5">
                <i
                  className="bi bi-type-bold"
                  onClick={handleBoldClick}
                  style={{ fontWeight: isBold ? "bold" : "normal" }}
                ></i>
                <i
                  className="bi bi-type-italic"
                  onClick={handleItalicClick}
                  style={{ fontStyle: isItalic ? "italic" : "normal" }}
                ></i>
                <i
                  className="bi bi-type-underline"
                  onClick={handleunderlineClick}
                  style={{ textDecoration: isUnderline ? "underline" : "none" }}
                ></i>
              </div>
              <div style={{ fontSize: "30px" }}>
                <i className="bi bi-list-ol px-1"></i>
                <i className="bi bi-list-task  px-1"></i>
                <i
                  className="bi bi-text-left"
                  onClick={handleftClick}
                  style={{ textAlign: isLeft ? "start" : "initial" }}
                ></i>
                <i
                  className="bi bi-text-center px-1"
                  onClick={handcenterClick}
                  style={{ textAlign: istextCenter ? "center" : "initial" }}
                ></i>
                <i
                  className="bi bi-text-right  px-1"
                  onClick={handRightClick}
                  style={{ textAlign: isRight ? "end" : "initial" }}
                ></i>
              </div>
            </div>
            <div className="">
              <textarea
                name=""
                id=""
                className="w-100 rounded p-3 h4"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  textDecoration: isUnderline ? "underline" : "initial",
                  textAlign: isLeft
                    ? "start"
                    : isRight
                    ? "end"
                    : istextCenter
                    ? "center"
                    : "initial",
                }}
              ></textarea>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Editor;
