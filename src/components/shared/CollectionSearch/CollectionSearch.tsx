import React, { useState } from 'react';
import { CollectionSearchEvent } from './CollectionSearchEvent';

export interface CollectionSearchProps {

    collectionId: string;
    onCollectionSearch: { (search: CollectionSearchEvent): void };
    labelText: string;
    buttonLabelText: string;
}

export const CollectionSearch: React.FC<CollectionSearchProps> = (props: CollectionSearchProps) => {

    const [searchText, setSearchText] = useState('');

    function onSearchTextChange(event: React.FormEvent<HTMLInputElement>) {
        setSearchText(event.currentTarget.value);
    }

    function performSearch() {
        props.onCollectionSearch({
            collectionId: props.collectionId,
            searchText: searchText,
            triggeredAt: new Date()
        });
    }

    return (
        <div className="card w-100 my-4 p-4 border-microevents">
            <form onSubmit={performSearch}>
                <div className="row">
                    <div className="col-12 col-sm-9">
                        <input id="searchText" type="text" name="searchText" placeholder={props.labelText}
                               value={searchText} onChange={onSearchTextChange}
                               className="form-control form-control-lg"/>
                    </div>
                    <div className="col-12 col-sm-3 d-flex mt-3 mt-sm-0 align-items-center">
                        <button type="submit"
                                className="btn btn-microevents form-control form-control-lg w-100">{props.buttonLabelText}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

CollectionSearch.defaultProps = {
    onCollectionSearch: () => {
    },
    labelText: 'Type your keyword here...:',
    buttonLabelText: 'Search',
};
