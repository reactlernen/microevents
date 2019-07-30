import React, { Fragment, useState, useRef } from 'react';
import { MicroEventService } from "../../../../domain/MicroEvent/MicroEventService";
import { Api } from "../../../../api/Api";
import { CreateEventRequest } from "../../../../api/event/CreateEventRequest";
import { Redirect } from "react-router";


const microEventService = new MicroEventService(new Api());

export interface MicroEventCreateProps {

}

const MicroEventCreate: React.FC<MicroEventCreateProps> = (props: MicroEventCreateProps) => {

    const [microEventCreated, setMicroEventCreated] = useState(false);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState<string | undefined>(undefined);

    const [eventDate, setEventDate] = useState('');
    const [eventDateError, setEventDateError] = useState<string | undefined>(undefined);

    const [pictureUrl, setPictureUrl] = useState('');
    const [pictureUrlError, setPictureUrlError] = useState<string | undefined>(undefined);

    const [shortDescription, setShortDescription] = useState('');
    const [shortDescriptionError, setShortDescriptionError] = useState<string | undefined>(undefined);


    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function createEvent(): void {

        const eventData: CreateEventRequest = {
            title,
            shortDescription,
            pictureUrl,
            eventDate
        };

        microEventService.createEvent(eventData).then(() => {
            setMicroEventCreated(true);
        });
    }

    function handleTitleChange({currentTarget: {classList, value, validity: {valid, valueMissing, tooShort}}}: React.FormEvent<HTMLInputElement>) {

        setTitle(value);

        if (valid) {
            classList.add('is-valid');
            classList.remove('is-invalid');
            setTitleError(undefined);

            submitButtonRef.current!.disabled = !formRef.current!.checkValidity()
            ;
        } else {
            classList.add('is-invalid');
            classList.remove('is-valid');

            if (tooShort) {
                setTitleError('The title has to be at least 5 characters long.');
            } else if (valueMissing) {
                setTitleError('The title is required');
            }

            submitButtonRef.current!.disabled = true;
        }
    }

    function handleDateChange({currentTarget: {classList, value, validity: {valid, typeMismatch, valueMissing}}}: React.FormEvent<HTMLInputElement>) {

        setEventDate(value);

        if (valid) {
            classList.add('is-valid');
            classList.remove('is-invalid');
            setEventDateError(undefined);

            submitButtonRef.current!.disabled = !formRef.current!.checkValidity()
            ;
        } else {
            classList.add('is-invalid');
            classList.remove('is-valid');

            if (typeMismatch) {
                setEventDateError('The Event Date has a bad format.');
            } else if (valueMissing) {
                setEventDateError('The Event Date is required');
            }

            submitButtonRef.current!.disabled = true;
        }
    }

    function handlePictureUrlChange({currentTarget: {classList, value, validity: {valid, valueMissing}}}: React.FormEvent<HTMLInputElement>) {

        setPictureUrl(value);

        if (valid) {
            classList.add('is-valid');
            classList.remove('is-invalid');
            setPictureUrlError(undefined);

            submitButtonRef.current!.disabled = !formRef.current!.checkValidity()
            ;
        } else {
            classList.add('is-invalid');
            classList.remove('is-valid');

            if (valueMissing) {
                setPictureUrlError('Provide a URL for a nice picture describing your event.');
            }

            submitButtonRef.current!.disabled = true;
        }
    }

    function handleShortDescription({currentTarget: {classList, value, validity: {valid, tooShort, tooLong, valueMissing}}}: React.FormEvent<HTMLTextAreaElement>) {

        setShortDescription(value);

        if (valid) {
            classList.add('is-valid');
            classList.remove('is-invalid');
            setShortDescriptionError(undefined);

            submitButtonRef.current!.disabled = !formRef.current!.checkValidity()
            ;
        } else {
            classList.add('is-invalid');
            classList.remove('is-valid');

            if (valueMissing) {
                setShortDescriptionError('The short description is required');
            } else if (tooShort) {
                setShortDescriptionError('The short description has to be at least 5 characters long.')
            } else if (tooLong) {
                setShortDescriptionError('The short description has to be at most 100 characters long.')
            }

            submitButtonRef.current!.disabled = true;
        }
    }

    return (
        <Fragment>
            <h1>Create a new Micro Event</h1>
            <form ref={formRef} onSubmit={createEvent} noValidate>

                <div className="form-row">
                    <div className="form-group col-12 col-sm-8">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                               className="form-control"
                               id="title"
                               aria-describedby="titleHelp"
                               placeholder="Enter title"
                               name="title"
                               required
                               minLength={5}
                               value={title}
                               onChange={handleTitleChange}/>
                        {!title && !titleError && (
                            <small id="titleHelp" className="form-text text-muted">Something catchy</small>
                        )}
                        {titleError && (
                            <div className="invalid-feedback">
                                {titleError}
                            </div>
                        )}
                        {!titleError && (
                            <div className="valid-feedback">
                                Yeah... that's a catchy title ;-).
                            </div>
                        )}
                    </div>

                    <div className="form-group col-12 col-sm-4">
                        <label htmlFor="title">Event Date</label>
                        <input type="date"
                               className="form-control"
                               id="eventDate"
                               aria-describedby="eventDateHelp"
                               placeholder="Enter a Date"
                               name="eventDate"
                               required
                               value={eventDate}
                               onChange={handleDateChange}/>
                        {!eventDate && !eventDateError && (
                            <small id="titleHelp" className="form-text text-muted">Give the people time to join your
                                event.</small>
                        )}
                        {eventDateError && (
                            <div className="invalid-feedback">
                                {eventDateError}
                            </div>
                        )}
                        {!eventDateError && (
                            <div className="valid-feedback">
                                Yeah... that's a good day ;-).
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-12">
                        <label htmlFor="title">Event Picutre URL</label>
                        <input type="url"
                               className="form-control"
                               id="pictureUrl"
                               aria-describedby="pictureUrlHelp"
                               placeholder="A picture URL"
                               name="pictureUrl"
                               value={pictureUrl}
                               onChange={handlePictureUrlChange}
                               required/>
                        {!pictureUrl && !pictureUrlError && (
                            <small id="titleHelp" className="form-text text-muted">A URL from a fancy picture in the
                                web.</small>
                        )}
                        {pictureUrlError && (
                            <div className="invalid-feedback">
                                {pictureUrlError}
                            </div>
                        )}

                    </div>
                    {!pictureUrlError && pictureUrl && (
                        <div className="col-12">
                            <img src={pictureUrl} className="img-thumbnail"/>
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group col-12">
                        <label htmlFor="shortDescription">Event Description.</label>
                        <textarea className="form-control"
                                  id="shortDescription"
                                  aria-describedby="shortDescriptionHelp"
                                  placeholder="A short Description"
                                  name="shortDescription"
                                  required
                                  minLength={5}
                                  maxLength={100}
                                  value={shortDescription}
                                  onChange={handleShortDescription}
                        />
                        {!shortDescription && !shortDescriptionError && (
                            <small id="titleHelp" className="form-text text-muted">A short description of your Event.</small>
                        )}
                        {shortDescriptionError && (
                            <div className="invalid-feedback">
                                {shortDescriptionError}
                            </div>
                        )}
                        {!shortDescriptionError && (
                            <div className="valid-feedback">
                                Good. Very descriptive :-)
                            </div>
                        )}
                    </div>
                </div>


                <button ref={submitButtonRef} type="submit" disabled={true} className="btn btn-microevents">Create
                    Event
                </button>
            </form>


            {microEventCreated && <Redirect to={'/events'}/>}
        </Fragment>
    );
};

export default MicroEventCreate;
