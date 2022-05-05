import React from "react";
import ReactDOM from "react-dom";
import domtoimage from 'dom-to-image';

const doSomething = (e) => {
  e.preventDefault(); // do something here
  let bg__image = document.querySelector("#bg__image");
  let prod__heading = document.querySelector("#prod__heading");
  let prod__desc = document.querySelector("#prod__desc");
  let prod__seller = document.querySelector("#prod__seller");

  let image__canvas = document.querySelector(".image__canvas");

  let Obj = {
    bg__image: bg__image,
    prod__heading: prod__heading,
    prod__desc: prod__desc,
    prod__seller: prod__seller,
  }


  var img1 = document.createElement("img");  
  img1.src = 'charts/a.png';  
}



class UploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null, prod__heading: null };
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    let bg__image = document.querySelector("#bg__image");
    let prod__heading = document.querySelector('#prod__heading').value;
    let prod__desc = document.querySelector("#prod__desc").value;
    let prod__price = document.querySelector("#prod__price").value;
    let prod__seller = document.querySelector("#prod__seller").value;

    this.setState({
      prod__heading: prod__heading,
      prod__desc: prod__desc,
      prod__price: prod__price,
      prod__seller: prod__seller
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }

  CapureImage(event) {
 
    var node = document.getElementById('resultImage');
 
    domtoimage.toJpeg(node, { quality: 1 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }
  
  render() {
    return (
      <div className="mainContainer">   
        <h3>Fill Details</h3>     
        <label>Product Bg:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input id="bg__image" name="bg__image" type="file" onChange={(e)=>this._handleImageChange(e)} />
        <label>Product Header&nbsp;</label>
        <input id="prod__heading" name="prod__heading" type="text" />
        <label>Product Desc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <textarea id="prod__desc" name="prod__desc" type="textarea"/>
        <label>Product Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input id="prod__price" name="prod__price" type="text" />
        <label>Product Seller&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input id="prod__seller" name="prod__seller" type="text" />
        

        <button onClick={this.onChange}>Submit</button>
        <div id="resultImage" className="resultImage">
        <img src={this.state.imagePreviewUrl} />
        <div className="rs__prod__texts">
        <div className="rs__prod__texts-inner">
        <div className="rs__prod__heading">{this.state.prod__heading}</div>
        <div className="rs__prod__desc">Information: {this.state.prod__desc}</div>
        <div className="rs__prod__price">Price: {this.state.prod__price}</div>
        <div className="rs__prod__seller">Available On: {this.state.prod__seller}</div> 
        </div>
        </div>
        </div>  

        <button className="CapureImage__btn" onClick={this.CapureImage}>CapureImage</button>

      </div>
    );
  }
}


function imagebuilder() {
  return (
    <div>
      <UploadPreview />
    </div>
  )
}

export default imagebuilder;
