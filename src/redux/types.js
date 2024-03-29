export const userConstants = {
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTERING: 'account/register',
    REGISTER_SUCCESS: 'register_success',
    REGISTER_FAILURE: 'register_failed',

    LOGIN_REQUEST: 'account/login',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_FAILURE: 'login_failed',

    LOGOUT: 'logout',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    DELETE_REQUEST: 'USERS_DELETE_REQUEST',
    DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
    DELETE_FAILURE: 'USERS_DELETE_FAILURE'
};

export const postConstant = {
    ADD_POST: 'post/add-post',
    GET_ALL_POST: 'post/get-all-post'
};

export const covidConstant = {
    TAMBAH_KECAMATAN: '/covid/tambah-kecamatan',
    TAMBAH_KECAMATAN_CSV: '/covid/tambah-kecamatan-csv',
    TAMBAH_DESA: '/covid/tambah-desa',
    TAMBAH_DESA_CSV: "/covid/tambah-desa-csv",
    GET_ALL_KECAMATAN: '/covid/get-all-kecamatan',
    GET_SUM_DATA_KECAMATAN:"/covid/get-sum-data-kecamatan/",
    GET_ONE_KECAMATAN:"/covid/get-one-kecamatan/",
    GET_DESA_IN_KECAMATAN:"/covid/get-desa-in-kecamatan/",
    EDIT_KECAMATAN:"/covid/edit-kecamatan/",
    EDIT_DESA:"/covid/edit-desa/",
    EDIT_DESA_URL:"/covid/edit-desa-by-url",
    DELETE_KECAMATAN:"/covid/delete-kecamatan/",
    DELETE_DESA:"/covid/delete-desa/",
    REQ_EDIT: 'REQ_EDIT_COVID',
    PROCESS_FAILED: 'PROCESS_FAILED'
}

export const dataRSConstants = {
    ADD_DATA: '/data-rs/create-first',
    GET_DATA: '/data-rs/get-data',
    GET_ONE_DATA: '/data-rs/get-one-data/',
    EDIT_DATA: '/data-rs/update-data/',
    REQ_EDIT: 'REQ_EDIT_RS',
    PROCESS_FAILED: 'PROCESS_FAILED'
}

export const reportConstants = {
    REQUEST_FILES_REPORT: '/report/submit-report',
    FILES_REPORT_SUCCESS: 'FILES_REPORT_SUCCESS',
    FILES_REPORT_FAILS: 'FILES_REPORT_FAILS',
    REQUEST_CONFIRM_REPORT: '/report/confirm-report',
    REQUEST_DELETE_REPORT: '/report/delete-report',
    CONFIRM_REPORT_SUCCESS: 'CONFIRM_REPORT_SUCCESS',
    CONFIRM_REPORT_FAILS: 'CONFIRM_REPORT_FAILS',
    DELETE_REPORT_SUCCESS: 'DELETE_REPORT_SUCCESS',
    DELETE_REPORT_FAILS: 'DELETE_REPORT_FAILS',
    RESET: 'RESET'
}

export const stokDarahConstants = {
    REQUEST_EDIT: 'REQUEST_EDIT_STOK',
    ADD_DATA: '/stok-darah/add-new',
    EDIT_DATA: '/stok-darah/edit-stok',
    PROCESS_FAILED: 'PROCESS_STOK_FAILED'
}
/*
router.post("/covid/tambah-kecamatan", covid.tambahKecamatan); 
router.post("/covid/tambah-kecamatan-csv", covid.tambahKecamatanCSV); 
router.post("/covid/tambah-desa", covid.tambahDesa); 
router.post("/covid/tambah-desa-csv", covid.tambahDesaCSV); 
router.get("/covid/get-all-kecamatan", covid.getAllKecamatan); 
router.get("/covid/get-sum-data-kecamatan/:idKecamatan", covid.getSumDataKecamatan); 
router.get("/covid/get-one-kecamatan/:namaKecamatan", covid.getOneKecamatan); 
router.get("/covid/get-desa-in-kecamatan/:idKecamatan", covid.getDesaInKecamatan); 
router.put("/covid/edit-kecamatan/:namaKecamatan", covid.updateDataKecamatan)
router.put("/covid/edit-desa/:namaDesa", covid.updateDataDesa);
router.delete("/covid/delete-kecamatan/:idKecamatan", covid.deleteKecamatan);
router.delete("/covid/delete-desa/:idDesa", covid.deleteDesa);
*/