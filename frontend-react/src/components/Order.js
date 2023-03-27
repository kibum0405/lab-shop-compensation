import React from 'react';
import axios from 'axios';
import './components.css'
import {
    Alert,
    Button, Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Snackbar,
    Typography
} from "@mui/material";
import String from "./primitives/String";
import Number from "./primitives/Number";


  class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: {
                status: false,
                timeout: 5000,
                type: "success",
                text: '삭제하였습니다.'
            },
        }
    }

    selectFile(){
        if(this.props.editMode === false) {
            return false;
        }
        var me = this
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.id = "uploadInput";

        input.click();
        input.onchange = function (event) {
            var file = event.target.files[0]
            var reader = new FileReader();

            reader.onload = function () {
                var result = reader.result;
                me.imageUrl = result;
                me.value.photo = result;

            };
            reader.readAsDataURL( file );
        };
    }

    edit = (bool) => {
        this.props.handleProps("editMode",bool, this.props.keyIndex);
    }

    save = async() =>{
        try {
            let temp = null;
            if(!this.props.offline) {
                if(this.props.isNew) {
                    temp = await axios.post(axios.fixUrl('/orders'), this.props.value);
                    window.location.reload()
                } else {
                    temp = await axios.put(axios.fixUrl(this.props.value._links.self.href), this.props.value);
                }
            }

            this.props.handleProps("value",temp.data);
            if (this.props.keyIndex && this.props.keyIndex !== 0) {
                this.props.handleProps("editMode",false, this.props.keyIndex);
            } else {
                this.props.handleProps("editMode",false);
            }
            this.props.handleProps("input", this.props.value);

            if (this.props.isNew) {
                this.props.add(this.props.value);
            } else {
                this.props.edit();
            }
            window.location.reload()

        } catch(e) {
            if(e.response && e.response.data.message) {
                this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.response.data.message} });
            } else {
                this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.response.data.message} });
            }
        }

    }
    remove = async() => {
        try {
            if (!this.props.offline) {
                await axios.delete(axios.fixUrl(this.props.value._links.self.href))
            }

            this.props.handleProps("editMode",false, this.props.keyIndex);
            this.props.handleProps("isDeleted",true, this.props.keyIndex);
            this.props.delete(this.props.value);
            window.location.reload();

        } catch(e) {
            if(e.response && e.response.data.message) {
                this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.response.data.message} });
            } else {
                this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.response.data.message} });
            }
        }
    }

    deleteFile = async () => {
        try {
            if(!this.props.offline) {
                let temp = await axios.put(axios.fixUrl(this.props.value._links['delete'].href))
                console.log(temp.data.status,this.props.keyIndex);
                this.props.handleProps("status",temp.data.status, this.props.keyIndex)
            }
            this.props.handleProps("editMode",false, this.props.keyIndex);
        } catch(e) {
            if(e.response && e.response.data.message) {
                this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.response.data.message} });
            } else {
                this.setState({snackbar: { ...this.state.snackbar, status : true, text: e} });
            }
        }
    }
    render(){
        const card = (
            <React.Fragment>
                <CardHeader
                    title={
                        this.props.value && this.props.value._links?
                        <Typography variant="h5" component="div">
                            Order # {this.props.value._links.self.href.split("/")[this.props.value._links.self.href.split("/").length - 1]}
                        </Typography>:
                        <Typography variant="h5" component="div">
                            Order
                        </Typography>
                    }
                />

                <CardContent className="aggre-gate-root-card-content-style">
                    <Typography className="aggre-gate-root-typography-style" color="text.secondary">
                        <String name="productId" label="productId" onChange={this.props.onChange} value={this.props.value.productId?this.props.value.productId:""} editMode={this.props.editMode}/>
                        <Number name="qty" label="qty" onChange={this.props.onChange} value={this.props.value.qty?this.props.value.qty:""} editMode={this.props.editMode}/>
                        <String name="customerId" label="customerId" onChange={this.props.onChange} value={this.props.value.customerId?this.props.value.customerId:""} editMode={this.props.editMode}/>
                        <Number name="amount" label="amount" onChange={this.props.onChange} value={this.props.value.amount?this.props.value.amount:""} editMode={this.props.editMode}/>
                        <String name="status" label="status" onChange={this.props.onChange} value={this.props.value.status?this.props.value.status:""} editMode={this.props.editMode}/>
                        <String name="address" label="address" onChange={this.props.onChange} value={this.props.value.address?this.props.value.address:""} editMode={this.props.editMode}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid className="aggre-gate-root-grid-style">
                        <Grid item xs />
                        <Grid item>
                            {!this.props.editMode?<Button onClick={()=>this.edit(true)} size="small">Edit</Button>:""}
                            {this.props.editMode?<Button onClick={this.save} size="small">Save</Button>:""}
                            {!this.props.editMode?<Button onClick={this.remove} size="small">Delete</Button>:""}
                            {this.props.editMode && !this.props.isNew?<Button onClick={()=>this.edit(false)} size="small">Cancel</Button>:""}
                        </Grid>
                    </Grid>
                </CardActions>
                {!this.props.editMode?
                    <CardActions>
                        <Grid container className="aggre-gate-root-grid-style">
                            <Grid item xs/>
                            <Grid item>
                                {this.props.editMode ? <Button onClick={this.deleteFile} size="small">Delete</Button> : ""}
                            </Grid>
                        </Grid>
                    </CardActions>:""}
                <Snackbar open={this.state.snackbar.status} autoHideDuration={this.state.snackbar.timeout} maxSnack={3} onClose={()=>this.setState({snackbar: { ...this.state.snackbar, status : false}})}>
                    <Alert onClose={this.props.handleClose} severity={this.state.snackbar.type}>
                        {this.state.snackbar.text}
                        <Button onClick={this.props.handleClose}>
                            Close
                        </Button>
                    </Alert>
                </Snackbar>
            </React.Fragment>
        );
        return (
            <div>
                <Container className="aggre-gate-root-container-style">
                    <Card class="aggre-gate-root-card-style" variant={this.props.keyIndex>=0?"outlined":""}>{card}</Card>
                </Container>
            </div>
        )}
}

export default Order;
