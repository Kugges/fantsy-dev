import React, { useState } from 'react'

const cStyle = {
    position: "relative",
    display: "inline-block",
    width: "300px",
    border: "1px solid lightblue",
    overflow: "auto"
}
const iStyle = {
    display: "inline-block",
    fontSize: "0.9em", 
    margin: "5px",
    width: "90%",
    border: "0"
}
function TagList({tags, onDeleteTag}) {
  let tagsUI = tags.map((tag) => {
    return <Tag 
       onDeleteTag = {()=>onDeleteTag(tag)}
       key={tag} value={tag} />
  });
  return (
    <div className="tag-list">
      {tagsUI}
    </div>
  );
}

const tagStyle  = {
    display: "inline-block",
    backgroundColor: "yellow",
    fontSize: "0.9em",
    margin: "5px",
    border: "1px solid lightblue",
    padding: "2px",
    cursor: "pointer"
}
function Tag({onDeleteTag, value}) {
  var tag = (
    <div class="tag-item">
      <span 
        onClick = {(e) => onDeleteTag(e, value)}
        style={tagStyle}>
        &#x2716; {" "}
       </span>
       {value}
    </div>
  );
  return (
    <>
      {tag}
    </>
  )
}

export default function InputTag({ defaultTags, onAddTag, onDeleteTag, placeholder }) {

    const [tags, setTags] = useState([]);

    onKeyUp = (e) => {
        console.log(e.which);
        // comma (188) for comma, and 13 for enter/return key
        if (e.which === 188 || e.which === 13) {
            let input = e.target.value.trim().split(",");
            // return if empty tags
            if (input.length === 0 || input[0] === "") return;
            onAddTag(input);
            e.target.value = "";
        }
    }
    onDelete = (tag) => {
        onDeleteTag(tag);
    }
    
    return (
        <div style={cStyle}>
            <TagList tags={defaultTags}
                onDeleteTag={onDeleteTag} />
            <input
                style={iStyle}
                onKeyUp={(e) => onKeyUp(e)}
                type="text" placeholder={placeholder} />
        </div>
    )
}

