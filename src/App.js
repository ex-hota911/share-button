import React, { Component } from 'react';
import './App.css';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';

class App extends Component {
  constructor () {
    super();
    this.state = {
      url: 'http://example.com',
      hide: false
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  copy(event) {
    event.target.select();
    document.execCommand('copy')
    this.setState({
      openSnackbar: true,
    })
  }
  toggleHide() {
    console.log('toggleHide')
    this.setState({
      hide: !this.state.hide,
    });
  }

  render() {
    var searchParams = {
      url: this.state.url,
      title: this.state.title,
      text: this.state.text,
      hide: this.state.hide
    }
    var params = [];
    for (var key in searchParams) {
      var val = searchParams[key];
      if (val) {
        params.push(key + '=' + encodeURIComponent(val));
      }
    }

    var url = 'https://hota911.github.io/share-button/share.html?' + params.join('&')

    var iframe = '<iframe src="' + url + '" width="80" height="20" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden;"></iframe>'
    var helperText = '';
    var error = false;
    if (!this.state.url && !this.state.title && !this.state.text) {
      error = true;
      helperText = 'URL, Title, or Text is required.';
    }
    var paperStyle = {
      padding: '24px',
      margin: '24px',
    }
    return (
      <div>
        <Typography type='display4'>
          Web Share Widget
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              <Typography type='title'>設定</Typography>
              <List>
                <ListItem>
                  <TextField
                    onChange={this.handleChange('url')}
                    label="URL"
                    value={this.state.url}
                    helperText={helperText}
                    error={error}
                    fullWidth
                    />
                </ListItem>
                <ListItem>
                  <TextField
                    onChange={this.handleChange('title')}
                    label="Title"
                    value={this.state.title}
                    helperText={helperText}
                    error={error}
                    fullWidth
                    />
                </ListItem>
                <ListItem>
                  <TextField
                    onChange={this.handleChange('text')}
                    label="Text"
                    value={this.state.text}
                    helperText={helperText}
                    error={error}
                    fullWidth
                    />
                </ListItem>
                <ListItem button onClick={this.toggleHide.bind(this)}>
                  <ListItemText primary="Web Share がサポートされていない場合は消す" />
                  <ListItemSecondaryAction>
                    <Switch
                      onClick={this.toggleHide.bind(this)}
                      checked={this.state.hide}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={paperStyle}>
              Preview: <iframe src={url} width={80} height={20} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
              <TextField
                label="URL"
                value={url}
                onFocus={this.copy.bind(this)}
                fullWidth
                />
              <TextField
                label="iframe"
                value={iframe}
                onFocus={this.copy.bind(this)}
                fullWidth
                />
              <Snackbar
                open={this.state.openSnackbar}
                message='Copied!'
                autoHideDuration={1}/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
