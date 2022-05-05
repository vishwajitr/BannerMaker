import React from "react";
import ReactDOM from "react-dom";
import domtoimage from 'dom-to-image';

class UploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      file: null, 
      prod__heading: 'Redmi Note 9 Pro/Redmi Note 9 Pro Max Dark Green',
      prod__saleprice: '399',
      prod__disc__percentage: '65'
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    let bg__image = document.querySelector("#bg__image");
    let prod__heading = document.querySelector('#prod__heading').value;
    let prod__saleprice = document.querySelector("#prod__saleprice").value;
    let prod__disc__percentage = document.querySelector("#prod__disc__percentage").value;
    let prod__font__size__header = document.querySelector("#prod__font__size__header").value;
    let prod__bg__picker = document.querySelector("#prod__bg__picker").value;
    let prod__color__picker = document.querySelector("#prod__color__picker").value;

    this.setState({
      prod__heading: prod__heading,
      prod__saleprice: prod__saleprice,
      prod__disc__percentage: prod__disc__percentage,
      prod__font__size__header: prod__font__size__header,
      prod__bg__picker : prod__bg__picker,
      prod__color__picker : prod__color__picker
    });
  }


  handleRadioChange = e => {
    const { name, value } = e.target;

    this.setState({
      prod__seller: value+".png"
    });
  };


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
    console.log(node)
    domtoimage.toJpeg(node, { quality: 1 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = prod__heading+'.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }
  
  render() {
    return (
      <div className="mainContainer row">   
        <div className="row">
        <div className="col-md-4">
        <h3>Fill Detailss</h3>    
        <div class="form-group"> 
        <label>Product Bg:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input  class="form-control-file" id="bg__image" name="bg__image" type="file" onChange={(e)=>this._handleImageChange(e)} />
        </div>
        <div class="form-group"> 
        <label>Product Header&nbsp;</label>
        <input  class="form-control" id="prod__heading" name="prod__heading" type="text" />
        </div>
        <div class="form-group"> 
        <label>Product Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input  class="form-control" id="prod__saleprice" name="prod__saleprice" type="text" />
        </div>
        <div class="form-group">
        <label>Product Disc %&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input  class="form-control" id="prod__disc__percentage" name="prod__disc__percentage" type="text" />
        </div>

        <div class="form-group">
        <label>Background Picker</label>
        <input  class="form-control" id="prod__bg__picker" name="prod__bg__picker" type="color" />
        </div>

        <div class="form-group">
        <label>color Picker</label>
        <input  class="form-control" id="prod__color__picker" name="prod__color__picker" type="color" />
        </div>
        <br/>
        <div class="form-group">
        <label>Font Size - Header</label>
        <input type="range" min="30" max="50" step="1" id="prod__font__size__header" />
        </div>
        <br/>
        <div class="form-group">
        <label>Seller</label>
        <div class="form-check">
        <input  class="form-check-input" type="radio" id="amazon" name="prod__seller" value="amazon"  onChange={this.handleRadioChange}/>
        <label class="form-check-label" for="amazon">amazon</label>
        </div>
        <div class="form-check">
        <input  class="form-check-input" type="radio" id="flipkart" name="prod__seller" value="flipkart"  onChange={this.handleRadioChange}/>
        <label class="form-check-label" for="flipkart">flipkart</label>
        </div>
        </div>
        <br/>
        <div class="form-group">
        <button onClick={this.onChange} className="btn btn-primary">Submit</button>   
        </div>         
       </div> 
       <div className="col-md-2">
         </div>
        <div className="col-md-6">
        <button className="CapureImage__btn btn  btn-success" onClick={this.CapureImage}>CapureImage</button>
        <div id="resultImage" className="resultImage">
        <img src={this.state.imagePreviewUrl} />
        <div className="rs__prod__texts" style={{backgroundColor: this.state.prod__bg__picker, color: this.state.prod__color__picker}}>
        <div className="rs__prod__texts-inner clearfix">
        <img src={this.state.prod__seller} class="rs__prod__texts-seller" />
        <div className="rs__prod__heading">{this.state.prod__heading}</div>
        <div className="rs__prod__price">
        <div className="rs__prod__saleprice" style={{fontSize: this.state.prod__font__size__header}}>Rs.{this.state.prod__saleprice}</div>
        <div className="rs__prod__disc__percentage">@{this.state.prod__disc__percentage}% Off</div>
        </div> 
        </div>
        </div>
        </div> 
        </div>
        </div> 
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

// todo
// black and white
// multiple images
// font size slider
// seller