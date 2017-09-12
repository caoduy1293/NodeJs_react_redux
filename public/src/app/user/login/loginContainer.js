import { connect } from 'react-redux';
import LoginComponent from './loginComponent';

const mapDispatchToPros = (dispatch) =>{
    return {
        resetMe: ()=>{

        }
    };
}
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, mapDispatchToPros)(LoginComponent);

