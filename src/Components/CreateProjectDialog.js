import React, { useState } from 'react'
import {
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    FormControlLabel,
    GridListTile
} from '@material-ui/core';
import {
    ProjectTextField,
    CreateProjectTitle,
    SaveButton,
    CancelButton,
    TagToolTip,
    FilterStyleTypography,
    PlatformsCreate,
    PlatformCreateCheckbox,
    PlatformGridList
} from './Styles';
import CheckBoxOutlineBlankSharp from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';
import ProjectSelect from './ProjectSelect';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../graphqlQueries';

function CreateProjectDialog(props) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [platforms, setPlatforms] = useState([]);
    const [amountOfWork, setAmountOfWork] = useState('');
    const [createProject] = useMutation(CREATE_PROJECT);
    const listOfPlatforms = [
        'Mobile',
        'Frontend',
        'Backend',
        'Embedded',
        'Desktop',
        'Blockchain',
        'AI/ML',
        'Tooling',
        'AR/VR',
        'Bots',
        'Design/UX',
        'Other',
    ];

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    };

    const handleTagChange = (event) => {
        if (
            event.target.value[event.target.value.length - 1] === ',' &&
            event.nativeEvent.data
        ) {
            event.target.value += ' ';
        }
        setTags(event.target.value);
    };

    const handleFilterClick = (event) => {
        const value = event.target.name;
        let tempPlatforms = [...platforms];
        if (platforms.includes(value)) {
            tempPlatforms.splice(platforms.indexOf(value), 1);
        } else {
            tempPlatforms.push(value);
        }
        setPlatforms(tempPlatforms);
    };

    const changeSelect = (label, value) => {
        switch (label) {
            case 'Difficulty':
                setDifficulty(value);
                break;
            case 'Amount of Work':
                setAmountOfWork(value);
                break;
            default:
                break;
        }
    };

    const handleSave = async () => {
        if (!props.isAuthenticated) {
          await props.loginWithRedirect();
        } else {
          const userId = getUserIdentifier(props.user.sub);
          await createProject({
            variables: {
              title,
              description,
              creatorUserId: userId,
              difficulty,
              platforms,
              amountOfWork,
              tags,
            },
          });
          handleClose();
          handleCreate();
        }
    };
    
    const handleClose = () => {
        props.setOpen(false);
        setTitle('');
        setDescription('');
        setDifficulty('');
        setPlatforms([]);
        setAmountOfWork('');
        setTags('');
    };

    const getUserIdentifier = (userSub) => {
        if (userSub) {
            const capturingRegex = /^.*\|(?<identifier>.+)$/;
            const found = userSub.match(capturingRegex);
            return found.groups.identifier;
        }
    };
    

    const handleCreate = () => {
        window.location.reload();
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='sm'>
            <CreateProjectTitle disableTypography={true}>
            Create Project
            </CreateProjectTitle>
            <DialogContent
            style={{ marginLeft: window.isMobile ? '0' : '1rem', marginRight: window.isMobile ? '0' : '1rem' }}>
            <ProjectTextField
                id='title'
                label='Name'
                type='text'
                variant='outlined'
                value={title}
                onChange={handleTitleChange}
                style={{ marginTop: 0 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TagToolTip title='Use , to seperate tags.' arrow>
                <ProjectTextField
                id='tags'
                label='Tags'
                type='text'
                variant='outlined'
                value={tags}
                onChange={handleTagChange}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </TagToolTip>
            <ProjectTextField
                id='description'
                label='Description'
                type='text'
                variant='outlined'
                value={description}
                onChange={handleDescriptionChange}
                multiline={true}
                InputLabelProps={{
                shrink: true,
                }}
                rows={2}
            />
            <Grid container item direction='row'>
                <ProjectSelect
                label='Difficulty'
                listOfValues={['Beginner', 'Intermediate', 'Advanced']}
                handleChange={changeSelect}
                />
                <ProjectSelect
                label='Amount of Work'
                listOfValues={['Little Work', 'Medium Work', 'Much Work']}
                handleChange={changeSelect}
                />
            </Grid>
            <PlatformGridList
                cols={3}
                spacing={1}
                cellHeight={60}
                justify='flex-start'
                style={{margin: '0.5rem'}}>
                <GridListTile cols={3} style={{height: 40}}>
                <PlatformsCreate>Platforms</PlatformsCreate>
                </GridListTile>
                {listOfPlatforms.map((checkBoxValue, i) => {
                return (
                    <GridListTile
                    key={i}
                    cols={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <FormControlLabel
                        control={
                        <PlatformCreateCheckbox
                            name={checkBoxValue}
                            size='small'
                            color='primary'
                            disableRipple={true}
                            icon={<CheckBoxOutlineBlankSharp />}
                            checkedIcon={<CheckBoxSharp />}
                            onClick={handleFilterClick}
                        />
                        }
                        label={
                        <FilterStyleTypography
                            style={{ fontSize: '0.8em' }}>
                            {checkBoxValue}
                        </FilterStyleTypography>
                        }
                        labelPlacement='top'
                    />
                    </GridListTile>
                );
                })}
            </PlatformGridList>
            </DialogContent>
            <DialogActions>
            <CancelButton
                onClick={handleClose}
                startIcon={<DeleteIcon />}>
                Cancel
            </CancelButton>
            <SaveButton onClick={handleSave} startIcon={<SaveIcon />}>
                Save
            </SaveButton>
            </DialogActions>
        </Dialog>
    )
}

export default CreateProjectDialog;