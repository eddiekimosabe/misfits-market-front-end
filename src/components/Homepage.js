import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	card: {
		maxWidth: 250
	},
	grid: {
		height: '100%'
	},
	gridContent: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	}
})

class Homepage extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: null,
			box: [],
			products: []
		}
		this.grabProducts = this.grabProducts.bind(this);
		this.addItemToBox = this.addItemToBox.bind(this);
		this.removeItemFromBox = this.removeItemFromBox.bind(this);
		this.saveItemInBox = this.saveItemInBox.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
	}

	componentDidMount(){
		this.grabProducts()
	}

	grabProducts(){
		fetch('https://applicant-dev.misfitsmarket.com/api/test/v1', {method:'GET'})
			.then(response => response.json())
			.then(body => this.setState({products: body.data.items}))
	}

	addItemToBox(item){
		if(Array.isArray(this.state.box) && !this.state.box.length){
			this.setState({box: [...this.state.box, item]})
		}
	}

	removeItemFromBox(item){
		this.setState({box: this.state.box.filter(i => i !== item)})
	}

	saveItemInBox(){
		const product = this.state.box[0]
		const productId = product.id

		const requestOptions = {
			method: 'POST',
			headers: {
				'X-Customer-Token': '721028102',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)
		}


		fetch(`https://applicant-dev.misfitsmarket.com/api/test/v1/${productId}`, requestOptions)
			.then(this.handleResponse)
	}

	handleResponse(response) {
		    return response.text().then(text => {
		        
		        const data = text && JSON.parse(text);

		        if (!response.ok) {
		            const error = (data && data.message) || response.statusText;
		           // return Promise.reject(error);
		           alert(error)
		        }
		        alert(data.msg)
		        // return data;
		    });
		};

	render(){
		const classes = this.props;
		const { box, products } = this.state;

		if(!products) return "Sold Out!"

		return(
			<Grid
				className={classes.grid}
				container
			>

				<Grid
					className={classes.gridContent}
					lg={4}
					xs={12}
					item
				>
					<h2>Box</h2>
						{box.map(selectedItem => (
							<Grid
								className={classes.gridContent} 
								item
								lg={12}
								xs={12}
							>
								<Card className={classes.root} variant="outlined">
									<CardContent>
										<Typography variant="h5" component="h2">
											{selectedItem.product}
										</Typography>

									</CardContent>

									<CardActions>
										<Button onClick={() => this.removeItemFromBox(selectedItem)}>Remove</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					<Button onClick={() => this.saveItemInBox()} disabled={box.length ? false : true}>Save</Button>
				</Grid>

				<Grid 
					className={classes.gridContent}
					lg={8}
					xs={12}
					item
				>
					{products.map(item => (
						<Grid
							className={classes.gridContent} 
							item
							lg={6}
							xs={12}
						>
							<Card className={classes.card} variant="outlined">
								<CardContent>
									<Typography variant="h3" component="h2">
										{item.product}
									</Typography>
									<br />
									<Typography variant="h4" component="p">
										{item.price}
									</Typography>
								</CardContent>
								
								<CardActions>
									<Button onClick={() => this.addItemToBox(item)} disabled={box.length ? true : false}>Add</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
					</Grid>

			</Grid>
		)
	}
}

export default withStyles(styles)(Homepage);