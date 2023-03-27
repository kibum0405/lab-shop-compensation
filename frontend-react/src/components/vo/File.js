import React from 'react';
import './vo.css'


// eslint-disable-next-line no-use-before-define
File.propTypes = {
    editMode: Boolean,
    value: [Object, String, Number, Array],
    label: String,
}
class File extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            fileName: "",
            file:null,
        }
    }   

    componentDidMount () {
        if (!this.props.value.file) {
            this.value = {
                "fileName": "",
                "file": null,
            };
        } else {
            this.file = new File([this.value.file], this.value.fileName);
        }
    }

    change(){
        var me = this;
        var reader = new FileReader();
        reader.onload = function () {
            var result = reader.result;
            this.file = result;
            var newValue = {
                "file": result,
                "fileName": me.value.fileName
            }
            me.$emit("input", newValue);
        };
        reader.readAsDataURL( this.file );
        this.value.fileName = this.file.name

    }

    download() {
        var link = document.createElement('a');
        link.href = this.file;
        link.setAttribute('download', this.value.fileName);
        document.body.appendChild(link);
        link.click();
    }

    render() {
        return (
            <div>
                <Card className="vo-file-card-style">
                    <CardContent>
                        <Typography ariant="h5" component="div">
                            
                        </Typography>
                        { 
                        value?
                        editMode?
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            autoComplete="current-password"
                            />
                        :
                        <CardActions onClick={this.download}>
                            <Button size="small">{value.fileName}</Button>
                        </CardActions>
                        :""
                        }
                    </CardContent>
                    
                </Card>
            </div>
        )
    };

}

export default File;