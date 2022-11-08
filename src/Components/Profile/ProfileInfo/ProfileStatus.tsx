import React from 'react';

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false
    }

    onEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    offEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.editMode
                            ? <input onBlur={this.offEditMode} value={this.props.status} autoFocus/>
                            : <span onDoubleClick={this.onEditMode}>{this.props.status}</span>
                    }
                </div>
            </div>
        );
    }
}