//global url
window.nodeUrl = "http://142.93.216.242:8080";

// Dashboard const
export const TOGGLE_COLLAPSED_NAV = 'toggle_collapse_menu';
export const DRAWER_TYPE = 'drawer_type';
export const FIXED_DRAWER = 'fixed_drawer';
export const COLLAPSED_DRAWER = 'collapsible';
export const MINI_DRAWER = 'mini_drawer';
export const THEME_COLOR = 'theme_color';
export const DARK_THEME = 'dark_theme';

// Add action types for CommitteMember screen
export const GET_COMMITTEE_MEMBER = 'get_committee_member';
export const DISPLAY_COMMITTEE_MEMBER = 'display_committee_member';
export const SEARCH_COMMITTEE_MEMBER = 'search_committee_member';
export const ON_OPEN_COMMITTEE_MEMBER_MODAL = 'on_open_committee_member_modal';
export const ON_CLOSE_COMMITTEE_MEMBER_MODAL = 'on_close_committee_member_modal';
export const ON_SAVE_COMMITTEE_MEMBER = 'on_save_committee_member';
export const HANDLE_REQUEST_COMMITTEE_CLOSE = 'handle_request_committee_close';
export const ON_DELETE_COMMITTEE_MEMBER = 'on_delete_committee_member';
export const COMMITTEE_MEMBER_TOGGLE_DROPDOWN = 'committee_member_toggle_dropdown';
export const COMMITTEE_MEMBER_SELECT_DROP_DOWN = 'committee_member_select_drop_down';
export const COMMITTEE_MEMBER_SELECT_DROP_DOWN_VALUE = 'committee_member_select_drop_down_value';
export const SEARCH = 'search';
export const COMMITTEE_MEMBER_CLEAR_INPUT = 'clear_input';
export const COMMITTEE_MEMBER_CLEAR_ALL = 'clear_all';
export const ON_DELETE_MEMBER_COMMITTEEMEMBER_DELETE = 'on_delete_member_delete_member';
export const GET_ALL_DESIGNATION='get_all_designation'

//Member module const
export const GET_ALL_MEMBERS = 'get_all_members';
export const SEARCH_MEMBERS = 'search_members';
export const TOGGLE_DROPDOWN = 'toggle_dropdown';
export const SELECT_DROP_DOWN = 'select_dropdown';
export const ON_SAVE_MEMBER = 'onSaveMember';
export const HANDLE_REQUEST_MEMBER_CLOSE = 'handleRequestMemberClose';

//Family Member const
export const ON_OPEN_FAMILY_MEMBER_MODAL = 'onOpenFamilyMemberModal';
export const ON_CLOSE_FAMILY_MEMBER_MODAL = 'onCloseFamilyMemberModal';
export const ON_SAVE_FAMILY_MEMBER = 'onSaveFamilyMember';
export const GET_FAMILY_MEMBERS_BY_ID = 'getFamilyMembersById';
export const GET_MEMBER_BY_ID = 'getMemberById';
export const MEMBER_TOGGLE_DROPDOWN = 'member_toggle_dropdown';
export const MEMBER_SELECT_DROP_DOWN = 'member_select_dropdown';
export const MEMBER_SELECT_DROP_DOWN_VALUE = 'member_select_drop_down_value';
export const MEMBER_CLEAR_INPUT = 'member_clear_input';
export const MEMBER_ON_SEARCH = 'member_on_search'
export const GET_ALL_CITIES = 'getAllCities';
export const GET_ALL_CITIZENSHIP = 'getAllCitizenships';
export const GET_ALL_NATIVES = 'getAllNatives';
export const GET_ALL_EDUCATION = 'getAllEducation';
export const GET_ALL_HEIGHTS = 'getAllHeights';

//EventManagment module const
export const GET_ALL_EVENTS = 'get_all_events';
export const SEARCH_EVENTS = 'search_events';
export const EVENTS_TOGGLE_DROPDOWN = 'events_toggle_dropdown';
export const EVENTS_SELECT_DROPDOWN = 'events_select_dropdown';
export const EVENTS_SELECT_DROPDOWN_VALUE = 'events_select_dropdown_value';
export const EVENT_SEARCH_VALUE = 'event_search_value';
export const EVENTS_CLEAR_INPUT = 'events_clear_input';
export const ON_SAVE_EVENT = 'onSaveEvent';
export const CLOSE_SNACKBAR = 'closeSnackbar';
export const GET_EVENT_BYID = 'getEventById';
export const ON_SAVE_EVENTPHOTOS = 'onSaveEventPhotos'
export const GET_EVENTPHOTOS_BYID ='getEventPhotosById'
export const ON_DELETE_EVENTPHOTOS = 'onDeleteEventPhotos'

//  Manage roles action types
export const GET_ALL_SYSTEMUSERS = 'getAllSystemUsers'
export const GET_ALL_SECURITYMODULES = 'getAllSecurityModules'
export const ON_SAVE_USERMODULE = 'onSaveUserModule'

//Advertisement action types
export const ON_SAVE_ADVERTISEMENT = 'onSaveAdvertisement'
export const GET_ALL_ADVERTISEMENTS = 'getAllAdvertisements'
export const SEARCH_ADVERTISEMENTS = 'searchAdvertisements';
export const ADVERTISEMENT_TOGGLE_DROPDOWN = 'advertisementToggleDropdown';
export const ADVERTISEMENT_SELECT_DROPDOWN = 'advertisementSelectDropdown';
export const ADVERTISEMENT_SELECT_DROPDOWN_VALUE = 'advertisementSelectDropdownValue';
export const ADVERTISEMENT_SEARCH_VALUE = 'advertisementSearchValue';
export const ADVERTISEMENT_CLEAR_INPUT = 'advertisementClearInput';
export const GET_ADVERTISEMENT_BYID = 'getAdvertisementById';
export const GET_ALL_ADVERTISEMENTTYPES = 'getAllAdvertisementTypes';
export const GET_ALL_ADVERTISEMENTLOCATIONS = 'getAllAdvertisementLocations';
export const GET_ADVERTISEMENTPHOTOS_BYID = 'getAdvertisementPhotosById';
export const ON_DELETE_ADVERTISEMENTPHOTOS = 'onDeleteAdvertisementPhotos';

//User module const
export const GET_ALL_USERS = 'get_all_users';
export const SEARCH_USER = 'search_user';
export const USER_SEARCH_VALUE = 'user_search_value';
export const USER_TOGGLE_DROPDOWN = 'user_toggle_dropdown';
export const USER_SELECT_DROPDOWN = 'user_select_dropdown';
export const USER_SELECT_DROPDOWN_VALUE = 'user_select_dropdown_value';
export const USER_CLEAR_INPUT = 'events_clear_input';
export const ON_SAVE_USER = 'on_save_user';
export const ON_CLOSE_USER_MODAL = 'on_close_user_modal';
export const ON_OPEN_USER_MODAL = 'on_open_user_modal';
export const HANDLE_REQUEST_USER_CLOSE = 'handle_request_user_close';
export const ON_UPDATE_PASSWORD = "on_update_password";
export const ON_CLOSE_UPDATE_PASSWORD_MODAL = 'on_close_update_password_modal';
export const ON_OPEN_UPDATE_PASSWORD_MODAL = 'on_open_update_password_modal';

//Banner module const
export const ON_SAVE_BANNER = 'on_save_banner';
export const GET_ALL_BANNER = 'get_all_banner';
export const BANNER_SEARCH_VALUE = 'banner_search_value';
export const BANNER_TOGGLE_DROPDOWN = 'banner_toggle_dropdown';
export const BANNER_SELECT_DROPDOWN = 'banner_select_dropdown';
export const BANNER_SELECT_DROPDOWN_VALUE = 'banner_select_dropdown_value';
export const BANNER_CLEAR_INPUT = 'banner_clear_input';
export const GET_BANNER_BY_ID = 'get_banner_by_id';
export const GET_BANNERPHOTOS_BYID = 'get_bannerphotos_byid';
export const ON_DELETE_BANNERPHOTOS = 'on_delete_bannerphotos';
export const CLOSE_BANNER_SNACKBAR = 'close_banner_snackbar';
export const SEARCH_BANNER = 'search_banner';
export const ON_DELETE_BANNER = 'on_delete_banner';