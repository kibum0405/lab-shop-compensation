import React from 'react';
import axios from 'axios';
import {Dialog, Grid, IconButton, SpeedDial, SpeedDialIcon, Stack} from "@mui/material";
import Inventory from "../Inventory";
import CloseIcon from "@mui/icons-material/Close";
import './Listers.css'

class InventoryCards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:false,
            values: [],
            newValue: {},
            offline:false,
            tick : true,
            editMode: true,
            openDialog : false,
        }
    }

    async componentDidMount () {
        let me = this.props;
        if(me.offline){
            if(!me.values) me.values = [];
            return;
        }

        let temp = await axios.get(axios.fixUrl('/inventories'));
        this.setState({
            ...this.state,
            values: temp.data._embedded.inventories,
            newValue: {
                'stock': 0,
            }
        });
    }
    handleListChange = (index,e) => {
        console.log("target check",e.target, index)
        this.setState((state) => {
            return {...state, values: this.state.values.map((el,i)=>i===index?{...el, [e.target.name]:e.target.value}:el)}
        });
    }

    handleChange = ({target}) => {
        console.log("String change", target );
        this.setState((state) => {
            return {...state, newValue: {...state.newValue,[target.name]:target.value}}
        });
    }

    closeDialog(){
        this.setState({ openDialog: false });
    }
    append = (value) => {
        this.setState({...this.state, tick: false,editMode:true, newValue:{}, values:this.state.values.push(value)});
        this.handleClose();
    }
    edit = () => {
        this.setState({ editMode: true });
    }
    remove = (value) => {
        let where = '삭제되었습니다.';
        this.setState((state) => {
            // eslint-disable-next-line array-callback-return
            return {...state, values: this.state.values.map((el,i)=> {
                    if (el._links.self.href !== value._links.self.href) {
                        return el;
                    } else {
                        where = i
                    }
                })}
        });
        alert(where);
        this.state.values.splice(where,1);
    }
    handleProps = (name, value, index) => {
        if (index >= 0) {
            console.log(name, value, index, this.state.values);
            this.setState((state) => {
                return {...state, values: this.state.values.map((el,i)=>i===index?{...el, [name]:value}:el)}
            });
        } else {
            this.setState({ [name]: value });
        }
    };
    handleClose = (props) => {
        this.setState({ open: false });
    }
    handleOpen = (props) => {
        this.setState({ open: true });
    }
    render() {
        const titleStyle = { marginLeft:"4%", marginTop:"10px" }
        // const Transition = React.forwardRef(function Transition(props, ref) {
        //     return <Slide direction="up" ref={ref} {...props} />;
        // });
        return (
            <div>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <h1 style={titleStyle}>Inventory</h1>
                    <SpeedDial className="index-card-speed-dial"
                        ariaLabel="SpeedDial controlled open example"
                        icon={<SpeedDialIcon />}
                        onClick={this.handleOpen}
                        open={this.state.open}
                    />
                    <Dialog
                        fullScreen
                        fullWidth={false}
                        maxWidth={false}
                        open={this.state.open}
                        onClose={this.handleClose}
                        // TransitionComponent={Transition}
                    >
                        <Grid container>
                            <Grid item xs>
                                {<Inventory offline={this.state.offline} isNew={true} editMode={this.state.editMode} value={this.state.newValue} onChange={this.handleChange}
                                       handleProps={this.handleProps} handleClose={this.handleClose} add={this.append} />}
                            </Grid>
                            <Grid>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={this.handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Dialog>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid className="index-card-grid2" container columns={this.state.values.length*4>=16?16:this.state.values.length*4}>
                        {this.state.values.map((value,index) => {
                            return (
                                <Grid item xs={4} key={index}>
                                    <Inventory offline={this.state.offline} keyIndex={index} onChange={this.handleListChange.bind(this, index)} editMode={value.editMode}
                                          append={this.append} edit={this.edit} value={value} delete={this.remove} handleProps={this.handleProps} handleClose={this.handleClose}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Stack>
            </div>
        );
    }
}

export default InventoryCards;
