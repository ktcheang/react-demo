var data = [{ name: "Mark Zuckerberg", content: "This is a Nice App!" }, { name: "Jordan Walke", content: "I'll grade this 80++." }, { name: "Thomas Mak", content: "Can't agree more!!" }];

var CommentApp = React.createClass({
    displayName: "CommentApp",

    loadDataFromVar: function loadDataFromVar() {
        this.setState({ data: data });
    },
    handleCommentSubmit: function handleCommentSubmit(comment) {
        this.props.data.push(comment);
        console.log(this.props.data);
    },
    getInitialState: function getInitialState() {
        return { data: [] };
    },
    componentDidMount: function componentDidMount() {
        this.loadDataFromVar();
        setInterval(this.loadDataFromVar, this.props.pollInterval);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "commentApp" },
            React.createElement(
                "h1",
                null,
                "Simple Comment App"
            ),
            React.createElement(AddCommentForm, { onCommentSubmit: this.handleCommentSubmit }),
            React.createElement(CommentList, { data: this.props.data })
        );
    }
});

var CommentList = React.createClass({
    displayName: "CommentList",

    render: function render() {
        var commentNodes = this.props.data.map(function (comment) {
            return React.createElement(Comment, { name: comment.name, content: comment.content });
        });
        return React.createElement(
            "div",
            { className: "commentList" },
            commentNodes
        );
    }
});

var AddCommentForm = React.createClass({
    displayName: "AddCommentForm",

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var content = React.findDOMNode(this.refs.content).value;

        if (!name || !content) {
            return;
        }
        this.props.onCommentSubmit({ name: name, content: content });
        return;
    },
    render: function render() {
        return React.createElement(
            "form",
            { className: "addCommentForm", onSubmit: this.handleSubmit },
            React.createElement("input", { type: "text", placeholder: "Your Name", ref: "name" }),
            React.createElement("textarea", { placeholder: "Comment here", ref: "content" }),
            React.createElement(
                "button",
                { type: "submit" },
                "Add Comment"
            )
        );
    }
});

var Comment = React.createClass({
    displayName: "Comment",

    render: function render() {
        return React.createElement(
            "div",
            { className: "comment" },
            React.createElement("img", { src: "https://placehold.it/100/f8a035/ffffff&text=" + this.props.name.substring(0, 1) }),
            React.createElement(
                "div",
                { className: "commentName" },
                this.props.name,
                ":"
            ),
            React.createElement(
                "p",
                null,
                this.props.content
            )
        );
    }
});

React.render(React.createElement(CommentApp, { data: data, pollInterval: 200 }), document.getElementById('app'));