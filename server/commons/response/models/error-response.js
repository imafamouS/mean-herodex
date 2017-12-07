module.exports = ErrorModel;

function ErrorModel({ code, message }) {
	this.code = code;
	this.message = message;
}
