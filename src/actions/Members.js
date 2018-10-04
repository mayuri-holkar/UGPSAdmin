import {
    GET_ALL_MEMBERS,
    SEARCH_MEMBERS,
    ON_SAVE_MEMBER,
    ON_SAVE_FAMILY_MEMBER,
    HANDLE_REQUEST_MEMBER_CLOSE,
    ON_OPEN_FAMILY_MEMBER_MODAL,
    ON_CLOSE_FAMILY_MEMBER_MODAL,
    GET_FAMILY_MEMBERS_BY_ID,
    GET_MEMBER_BY_ID,
    MEMBER_TOGGLE_DROPDOWN,
    MEMBER_SELECT_DROP_DOWN,
    MEMBER_SELECT_DROP_DOWN_VALUE,
    MEMBER_CLEAR_INPUT,
    MEMBER_ON_SEARCH,
    GET_ALL_CITIES,
    GET_ALL_CITIZENSHIP,
    GET_ALL_NATIVES,
    GET_ALL_EDUCATION,
    GET_ALL_HEIGHTS
} from "constants/ActionTypes";
import { authHeader } from '../Headers/index';
import history from '../../src';

export const getMembers = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/members/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_MEMBERS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const searchMember = (dropDownValue, searchName) => {
    return function (dispatch, getState) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/members/" + dropDownValue + "/" + searchName, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: SEARCH_MEMBERS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
}

export const onSearchMembers = (event) => {
    return {
        type: MEMBER_ON_SEARCH,
        payload: event.target.value
    }
}

export const toggleDropDown = () => {
    return {
        type: MEMBER_TOGGLE_DROPDOWN,
        payload: ''
    };
}

export const selectDropDown = (event) => {
    return {
        type: MEMBER_SELECT_DROP_DOWN,
        payload: event.target.innerText
    };
}

export const onSaveMember = (member) => {
    const memberData = new FormData();

    memberData.append('Gender', member.Gender);
    memberData.append('FullName', member.FullName);
    memberData.append('FatherName', member.FatherName);
    memberData.append('SurName', member.SurName);
    memberData.append('Address', member.Address);
    memberData.append('Taluka', member.Taluka);
    memberData.append('Jeello', member.Jeello);
    memberData.append('PinCode', member.PinCode);
    memberData.append('HomePhone', member.HomePhone);
    memberData.append('MobileNo', member.MobileNo);
    memberData.append('Email', member.Email);
    memberData.append('GrandFatherName', member.GrandFatherName);
    memberData.append('Gol', member.Gol);
    memberData.append('PetaAttak', member.PetaAttak);
    memberData.append('MulVatan', member.MulVatan);
    memberData.append('FileName', member.FileName);
    memberData.append('IsActive', member.IsActive);
    memberData.append('OtherInformation', member.OtherInformation);
    memberData.append('Ajivansabhyanumber', member.Ajivansabhyanumber);
    memberData.append('Image', member.Image);
    memberData.append('OldFileName', member.OldFileName);
    memberData.append('FileNameInFolder', '');

    if (member.MemberId) {
        return function (dispatch) {
            fetch(nodeUrl+'/members/' + member.MemberId, {
                method: 'PUT',
                headers: { ...authHeader() },
                body: memberData
            }).then(response => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_MEMBER,
                        payload: json
                    });
                }, err => {
                    console.log('Error occured while updating member');
                });
        }
    }
    else {
        return function (dispatch) {
            fetch(nodeUrl+'/members/', {
                method: 'POST',
                headers: { ...authHeader() },
                body: memberData
            }).then((Response) => Response.json())
                .then(json => {
                    var data = {
                        Member_Id: json.Member_Id,
                        MemberName:json.MemberName
                    };
                    dispatch({
                        type: ON_SAVE_MEMBER,
                        payload: data
                    });
                }, err => {
                    console.log('Error occured while saving member');
                });
        }
    }
};

export const handleRequestMemberClose = () => {
    return {
        type: HANDLE_REQUEST_MEMBER_CLOSE,
        payload: ''
    };
};

export const onOpenFamilyMemberModal = () => {
    return {
        type: ON_OPEN_FAMILY_MEMBER_MODAL,
        payload: ''
    };
};

export const onCloseFamilyMemberModal = () => {
    return {
        type: ON_CLOSE_FAMILY_MEMBER_MODAL,
        payload: ''
    };
};

export const onSaveFamilyMember = (familymember) => {
    if (familymember.FamilyMemberId) {
        return function (dispatch) {
            const familyMemberData = new FormData();
            familyMemberData.append('file', familymember.file);
            familyMemberData.append('Name', familymember.Name);
            familyMemberData.append('Relation', familymember.Relation);
            familyMemberData.append('Dob', familymember.Dob);
            familyMemberData.append('BloodGroup', familymember.BloodGroup);
            familyMemberData.append('Education', familymember.Education);
            familyMemberData.append('MaritalStatus', familymember.MaritalStatus);
            familyMemberData.append('MarriageDate', familymember.MarriageDate);
            familyMemberData.append('LookingForPartner',familymember.LookingForPartner);
            familyMemberData.append('PartnerHeight', familymember.PartnerHeight);
            familyMemberData.append('Email', familymember.Email);
            familyMemberData.append('Occupation', familymember.Occupation); 
            familyMemberData.append('OccupationType', familymember.OccupationType);
            familyMemberData.append('Mobile', familymember.Mobile);
            familyMemberData.append('BusinessAddress', familymember.BusinessAddress);
            familyMemberData.append('Filename', familymember.Filename);
            familyMemberData.append('FamilyMemberId', familymember.FamilyMemberId);
            familyMemberData.append('MemberId', familymember.MemberId);
            familyMemberData.append('Gender', familymember.Gender);
            familyMemberData.append('Weight', familymember.Weight);
            familyMemberData.append('SkinTone', familymember.SkinTone);
            familyMemberData.append('OldFileName', familymember.OldFileName);
            familyMemberData.append('City', familymember.City);
            familyMemberData.append('Citizenship', familymember.Citizenship);
            familyMemberData.append('Native', familymember.Native);
            familyMemberData.append('Manglik', familymember.Manglik);
            familyMemberData.append('Handicaped', familymember.Handicaped == '' ? false : true);
            familyMemberData.append('Age', familymember.Age);

            fetch(nodeUrl+'/familymembers/' + familymember.FamilyMemberId, {
                method: 'PUT',
                headers: { ...authHeader() },
                body: familyMemberData
            }).then(response => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_FAMILY_MEMBER,
                        payload: json
                    });
                    dispatch(getFamilyMembersById(familymember.MemberId));
                }, err => {
                    console.log('Error occured while updating family member');
                });
        }
    }
    else {
        return function (dispatch, getState) {
            const memberid = getState().Member.memberid;
            const familyMemberData = new FormData();

            familyMemberData.append('file', familymember.file);
            familyMemberData.append('MemberId', familymember.MemberId ? familymember.MemberId : memberid);
            familyMemberData.append('Name', familymember.Name);
            familyMemberData.append('Relation', familymember.Relation);
            familyMemberData.append('Dob', familymember.Dob);
            familyMemberData.append('BloodGroup', familymember.BloodGroup);
            familyMemberData.append('Education', familymember.Education);
            familyMemberData.append('MaritalStatus', familymember.MaritalStatus);
            familyMemberData.append('MarriageDate', familymember.MarriageDate);
            familyMemberData.append('LookingForPartner', familymember.LookingForPartner);
            familyMemberData.append('PartnerHeight', familymember.PartnerHeight);
            familyMemberData.append('Email', familymember.Email);
            familyMemberData.append('Occupation', familymember.Occupation);
            familyMemberData.append('OccupationType', familymember.OccupationType);
            familyMemberData.append('Mobile', familymember.Mobile);
            familyMemberData.append('BusinessAddress', familymember.BusinessAddress);
            familyMemberData.append('Filename', familymember.Filename);
            familyMemberData.append('Gender', familymember.Gender);
            familyMemberData.append('Weight', familymember.Weight);
            familyMemberData.append('SkinTone', familymember.SkinTone);
            familyMemberData.append('City', familymember.City);
            familyMemberData.append('Citizenship', familymember.Citizenship);
            familyMemberData.append('Native', familymember.Native);
            familyMemberData.append('Manglik', familymember.Manglik);
            familyMemberData.append('Handicaped', familymember.Handicaped == '' ? false : true);
            familyMemberData.append('Age', familymember.Age);

            fetch(nodeUrl+'/familymembers/', {
                method: 'POST',
                headers: { ...authHeader() },
                body: familyMemberData
            }).then((Response) => Response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_FAMILY_MEMBER,
                        payload: json
                    });
                    dispatch(getFamilyMembersById(familymember.MemberId ? familymember.MemberId : memberid))
                }, err => {
                    console.log('Error occured while inserting family member');
                });
        }
    }
};

export const getFamilyMembersById = (mid) => {
    return function (dispatch, getState) {
     const memberid = getState().Member.memberid;
     fetch(nodeUrl+"/familymembers/" + (mid ? mid : memberid), {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_FAMILY_MEMBERS_BY_ID,
                    payload: json
                });
            });
    }
};

export const getMemberById = (memberId) => {
    return function (dispatch) {
        fetch(nodeUrl+"/members/" + memberId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                var data = {
                    Member_Id: json.Member_Id,
                    member:json.member
                };
                dispatch({
                    type: GET_MEMBER_BY_ID,
                    payload: data
                });
            });
    }
};

export const selectDropDownValue = (event) => {
    return {
        type: MEMBER_SELECT_DROP_DOWN_VALUE,
        payload: event.currentTarget.value
    }
}

export const clearInput = () => {
    return {
        type: MEMBER_CLEAR_INPUT,
        payload: ''
    }
}

export const getAllCities = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/cities/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_CITIES,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const getAllCitizenships = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/citizenship/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_CITIZENSHIP,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const getAllNatives = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/natives/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_NATIVES,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const getAllEducation = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/education/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_EDUCATION,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const getAllHeights = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/heights/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_HEIGHTS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};