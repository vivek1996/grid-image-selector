import { useState } from "react";
import "./App.css";
import Images from "./Data/images";

function App() {
  const [selectedImages, setSelectedImages] = useState({});
  const [imageSelectionStarted, toggleImageSelection] = useState(false);
  const [currentSet, setCurrentSet] = useState(null);

  const handleBtnClick = (img) => {
    if (imageSelectionStarted) {
      setSelectedImages((prevState) => ({
        ...prevState,
        [currentSet]: { ...prevState[currentSet], end: img.id },
      }));
      setCurrentSet(null);
      toggleImageSelection((prevState) => !prevState);
    } else {
      setSelectedImages((prevState) => ({
        ...prevState,
        [img.id]: { elements: [img.id], start: img.id },
      }));
      setCurrentSet(img.id);
      toggleImageSelection((prevState) => !prevState);
    }
  };

  const handleOnMouseOver = (event) => {
    if (!imageSelectionStarted) return;
    const { target } = event;
    if (target.nodeName !== "IMG") return;
    const hoveredImgId = Number(target.id);
    if (hoveredImgId < Number(currentSet)) return;
    // if (!selectedImages[currentSet].elements.includes(hoveredImgId)) {
    const allElements = [];
    for (let i = Number(currentSet); i <= hoveredImgId; i++) {
      allElements.push(i);
    }

    setSelectedImages((preState) => ({
      ...preState,
      [currentSet]: {
        ...preState[currentSet],
        elements: allElements,
      },
    }));
    // }
  };

  const imageIsSelected = (id) => {
    console.log(selectedImages);
    const selectedImageArr = [
      ...Object.keys(selectedImages).map((key) => selectedImages[key].elements),
    ].flat(Infinity);
    return selectedImageArr.includes(id);
  };

  const showButton = (id) => {
    if (imageSelectionStarted) {
      return !Number(id) < Number(currentSet);
    } else {
      return false;
    }
  };

  return (
    <div className="App">
      <div
        className={`grid ${imageSelectionStarted ? "cursor" : ""}`}
        onMouseOver={handleOnMouseOver}
      >
        {Images.map((img) => (
          <label
            key={img.id}
            className={`image-container ${
              imageIsSelected(img.id) ? "checked" : ""
            }`}
          >
            <img src={img.src} alt={img.id} id={img.id} name="image" />
            <div className={`btn-container ${showButton(img.id)}`}>
              <button
                  className={`btn start-btn`}
                  onClick={() => handleBtnClick(img)}
              >
                {imageSelectionStarted ? "Stop" : "Start"}
              </button>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
