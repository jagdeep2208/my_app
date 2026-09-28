// ==========================================
// ELEMENTS
// ==========================================

const addMemberBtn =
    document.getElementById("addMemberBtn");

const memberForm =
    document.getElementById("memberForm");

const saveMemberBtn =
    document.getElementById("saveMemberBtn");

const formTitle =
    document.getElementById("formTitle");

const searchInput =
    document.getElementById("searchInput");

const departmentFilter =
    document.getElementById("departmentFilter");

const membershipIdInput =
    document.getElementById("membership_id");

const nameInput =
    document.getElementById("name");

const departmentInput =
    document.getElementById("department");

const contactNoInput =
    document.getElementById("contact_no");

const companyNameInput =
    document.getElementById("company_name");

const memberList =
    document.getElementById("memberList");


// ==========================================
// MY DEPARTMENTS ELEMENTS
// ==========================================

const departmentsToggle =
    document.getElementById("departmentsToggle");

const departmentMenu =
    document.getElementById("departmentMenu");


// ==========================================
// GLOBAL DATA
// ==========================================

let allMembers = [];


// ==========================================
// OPEN / CLOSE MY DEPARTMENTS
// ==========================================

if (
    departmentsToggle &&
    departmentMenu
) {

    departmentsToggle.addEventListener(
        "click",
        function () {

            departmentMenu.classList.toggle(
                "show"
            );

        }
    );

}


// ==========================================
// GET UNIQUE DEPARTMENTS
// ==========================================

function getDepartments(members) {

    if (
        !members ||
        !Array.isArray(members)
    ) {

        return [];

    }


    const departments = [
        ...new Set(

            members
                .map(function (member) {

                    return String(
                        member.department || ""
                    ).trim();

                })

                .filter(function (department) {

                    return department !== "";

                })

        )
    ];


    departments.sort(
        function (a, b) {

            return a.localeCompare(
                b,
                undefined,
                {
                    sensitivity: "base"
                }
            );

        }
    );


    return departments;

}


// ==========================================
// UPDATE MAIN DEPARTMENT FILTER
// ==========================================

function populateDepartmentFilter(
    members
) {

    if (!departmentFilter) {

        return;

    }


    const currentValue =
        departmentFilter.value;


    const departments =
        getDepartments(members);


    departmentFilter.innerHTML = `
        <option value="">
            All Departments
        </option>
    `;


    departments.forEach(
        function (department) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                department;

            option.textContent =
                department;

            departmentFilter.appendChild(
                option
            );

        }
    );


    // Restore previous selection
    if (
        departments.includes(
            currentValue
        )
    ) {

        departmentFilter.value =
            currentValue;

    } else {

        departmentFilter.value =
            "";

    }

}


// ==========================================
// UPDATE MY DEPARTMENTS SIDEBAR
// ==========================================

function populateMyDepartments(
    members
) {

    if (!departmentMenu) {

        return;

    }


    const departments =
        getDepartments(members);


    departmentMenu.innerHTML = "";


    // --------------------------------------
    // NO DEPARTMENTS
    // --------------------------------------

    if (
        departments.length === 0
    ) {

        const emptyItem =
            document.createElement(
                "div"
            );

        emptyItem.className =
            "department-link";

        emptyItem.textContent =
            "No departments";

        emptyItem.style.cursor =
            "default";

        departmentMenu.appendChild(
            emptyItem
        );

        return;

    }


    // --------------------------------------
    // ALL DEPARTMENTS OPTION
    // --------------------------------------

    const allButton =
        document.createElement(
            "button"
        );

    allButton.type =
        "button";

    allButton.className =
        "department-link";

    allButton.dataset.department =
        "";

    allButton.textContent =
        "All Departments";


    allButton.addEventListener(
        "click",
        function () {

            selectDepartment("");

        }
    );


    departmentMenu.appendChild(
        allButton
    );


    // --------------------------------------
    // INDIVIDUAL DEPARTMENTS
    // --------------------------------------

    departments.forEach(
        function (department) {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "department-link";

            button.dataset.department =
                department;

            button.textContent =
                department;


            button.addEventListener(
                "click",
                function () {

                    selectDepartment(
                        department
                    );

                }
            );


            departmentMenu.appendChild(
                button
            );

        }
    );

}


// ==========================================
// SELECT DEPARTMENT
// ==========================================

function selectDepartment(
    department
) {

    // Update main dropdown
    if (departmentFilter) {

        departmentFilter.value =
            department;

    }


    // Apply department + search filter
    applyFilters();


    // Scroll to members
    if (memberList) {

        memberList.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    // Close sidebar dropdown
    if (departmentMenu) {

        departmentMenu.classList.remove(
            "show"
        );

    }

}


// ==========================================
// MAIN DEPARTMENT FILTER CHANGE
// ==========================================

if (departmentFilter) {

    departmentFilter.addEventListener(
        "change",
        function () {

            applyFilters();

        }
    );

}


// ==========================================
// OPEN ADD MEMBER FORM
// ==========================================

if (addMemberBtn) {

    addMemberBtn.addEventListener(
        "click",
        function () {

            clearForm();

            memberForm.style.display =
                "block";

            formTitle.textContent =
                "Add New Member";

            saveMemberBtn.textContent =
                "Save Member";

            membershipIdInput.disabled =
                false;

            memberForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


// ==========================================
// SAVE / UPDATE MEMBER
// ==========================================

if (saveMemberBtn) {

    saveMemberBtn.addEventListener(
        "click",
        async function () {

            const membershipId =
                membershipIdInput.value.trim();

            const name =
                nameInput.value.trim();

            const department =
                departmentInput.value.trim();

            const contactNo =
                contactNoInput.value.trim();

            const companyName =
                companyNameInput.value.trim();


            // --------------------------------------
            // VALIDATION
            // --------------------------------------

            if (
                !membershipId ||
                !name ||
                !department ||
                !contactNo ||
                !companyName
            ) {

                alert(
                    "Please fill all fields."
                );

                return;

            }


            const member = {

                membership_id:
                    membershipId,

                name:
                    name,

                department:
                    department,

                contact_no:
                    contactNo,

                company_name:
                    companyName

            };


            try {

                let response;


                // ==================================
                // UPDATE MEMBER
                // ==================================

                if (
                    saveMemberBtn.dataset.editing
                ) {

                    const originalMembershipId =
                        saveMemberBtn.dataset.editing;


                    response =
                        await fetch(
                            `/members/${encodeURIComponent(
                                originalMembershipId
                            )}`,
                            {

                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        name:
                                            name,

                                        department:
                                            department,

                                        contact_no:
                                            contactNo,

                                        company_name:
                                            companyName

                                    })

                            }
                        );

                }


                // ==================================
                // ADD MEMBER
                // ==================================

                else {

                    response =
                        await fetch(
                            "/members",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        member
                                    )

                            }
                        );

                }


                // ----------------------------------
                // RESPONSE
                // ----------------------------------

                const result =
                    await response.json();


                // ----------------------------------
                // ERROR
                // ----------------------------------

                if (!response.ok) {

                    alert(
                        "Error: " +
                        (
                            result.message ||
                            "Something went wrong"
                        )
                    );

                    return;

                }


                // ----------------------------------
                // SUCCESS
                // ----------------------------------

                if (
                    saveMemberBtn.dataset.editing
                ) {

                    alert(
                        "Member updated successfully!"
                    );

                } else {

                    alert(
                        "Member added successfully!"
                    );

                }


                // Reload everything
                clearForm();

                await loadMembers();

                await loadDashboard();

            }


            catch (error) {

                console.error(
                    "Server error:",
                    error
                );

                alert(
                    "Server error. Please try again."
                );

            }

        }
    );

}


// ==========================================
// LOAD MEMBERS
// ==========================================

async function loadMembers() {

    try {

        const response =
            await fetch("/members");


        if (!response.ok) {

            throw new Error(
                "Could not load members"
            );

        }


        const members =
            await response.json();


        allMembers =
            members;


        // Populate both department systems
        populateDepartmentFilter(
            members
        );

        populateMyDepartments(
            members
        );


        // Apply current filters
        applyFilters();

    }


    catch (error) {

        console.error(
            "Error loading members:",
            error
        );


        if (memberList) {

            memberList.innerHTML =
                "<p>Unable to load members.</p>";

        }

    }

}


// ==========================================
// APPLY SEARCH + DEPARTMENT FILTER
// ==========================================

function applyFilters() {

    if (!memberList) {

        return;

    }


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedDepartment =
        departmentFilter
            ? departmentFilter.value.trim()
            : "";


    const filteredMembers =
        allMembers.filter(
            function (member) {


                // ----------------------------------
                // SEARCH MATCH
                // ----------------------------------

                const matchesSearch =

                    !searchText ||

                    String(
                        member.name || ""
                    )
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                    ||

                    String(
                        member.membership_id || ""
                    )
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                    ||

                    String(
                        member.department || ""
                    )
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                    ||

                    String(
                        member.contact_no || ""
                    )
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                    ||

                    String(
                        member.company_name || ""
                    )
                    .toLowerCase()
                    .includes(
                        searchText
                    );


                // ----------------------------------
                // DEPARTMENT MATCH
                // ----------------------------------

                const memberDepartment =
                    String(
                        member.department || ""
                    ).trim();


                const matchesDepartment =

                    !selectedDepartment ||

                    memberDepartment ===
                        selectedDepartment;


                // ----------------------------------
                // BOTH MUST MATCH
                // ----------------------------------

                return (
                    matchesSearch &&
                    matchesDepartment
                );

            }
        );


    displayMembers(
        filteredMembers
    );

}


// ==========================================
// DISPLAY MEMBERS
// ==========================================

function displayMembers(
    members
) {

    if (!memberList) {

        return;

    }


    memberList.innerHTML =
        "";


    // --------------------------------------
    // NO MEMBERS
    // --------------------------------------

    if (
        !members ||
        members.length === 0
    ) {

        memberList.innerHTML =
            "<p>No members found.</p>";

        return;

    }


    // --------------------------------------
    // CREATE CARDS
    // --------------------------------------

    members.forEach(
        function (member) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "member-card";


            card.innerHTML = `

                <h3>
                    ${escapeHTML(
                        member.name
                    )}
                </h3>

                <p>
                    <strong>
                        Membership ID:
                    </strong>

                    ${escapeHTML(
                        member.membership_id
                    )}
                </p>

                <p>
                    <strong>
                        Department:
                    </strong>

                    ${escapeHTML(
                        member.department
                    )}
                </p>

                <p>
                    <strong>
                        Contact:
                    </strong>

                    ${escapeHTML(
                        member.contact_no
                    )}
                </p>

                <p>
                    <strong>
                        Company:
                    </strong>

                    ${escapeHTML(
                        member.company_name
                    )}
                </p>

                <div class="member-actions">

                    <button
                        class="edit-btn"
                        onclick="editMember('${escapeAttribute(
                            member.membership_id
                        )}')"
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteMember('${escapeAttribute(
                            member.membership_id
                        )}')"
                    >
                        Delete
                    </button>

                </div>

            `;


            memberList.appendChild(
                card
            );

        }
    );

}


// ==========================================
// EDIT MEMBER
// ==========================================

function editMember(
    membershipId
) {

    const member =
        allMembers.find(
            function (item) {

                return (
                    String(
                        item.membership_id
                    ) ===
                    String(
                        membershipId
                    )
                );

            }
        );


    if (!member) {

        alert(
            "Member not found."
        );

        return;

    }


    // --------------------------------------
    // FILL FORM
    // --------------------------------------

    membershipIdInput.value =
        member.membership_id;

    nameInput.value =
        member.name;

    departmentInput.value =
        member.department;

    contactNoInput.value =
        member.contact_no;

    companyNameInput.value =
        member.company_name;


    // --------------------------------------
    // EDIT MODE
    // --------------------------------------

    memberForm.style.display =
        "block";


    formTitle.textContent =
        "Edit Member";


    saveMemberBtn.textContent =
        "Update Member";


    saveMemberBtn.dataset.editing =
        membershipId;


    membershipIdInput.disabled =
        true;


    memberForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ==========================================
// DELETE MEMBER
// ==========================================

async function deleteMember(
    membershipId
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this member?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `/members/${encodeURIComponent(
                    membershipId
                )}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        // ----------------------------------
        // ERROR
        // ----------------------------------

        if (!response.ok) {

            alert(
                "Error: " +
                (
                    result.message ||
                    "Could not delete member"
                )
            );

            return;

        }


        // ----------------------------------
        // SUCCESS
        // ----------------------------------

        alert(
            "Member deleted successfully!"
        );


        await loadMembers();

        await loadDashboard();

    }


    catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "Server error. Please try again."
        );

    }

}


// ==========================================
// SEARCH MEMBERS
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            /*
             * IMPORTANT:
             * Do NOT directly filter allMembers here.
             *
             * applyFilters() handles:
             *
             * Search
             * +
             * Department
             *
             * together.
             */

            applyFilters();

        }
    );

}


// ==========================================
// CLEAR FORM
// ==========================================

function clearForm() {

    membershipIdInput.value =
        "";

    nameInput.value =
        "";

    departmentInput.value =
        "";

    contactNoInput.value =
        "";

    companyNameInput.value =
        "";


    // Reset edit mode
    delete saveMemberBtn.dataset.editing;


    // Reset button
    saveMemberBtn.textContent =
        "Save Member";


    // Reset title
    formTitle.textContent =
        "Add New Member";


    // Enable membership ID
    membershipIdInput.disabled =
        false;


    // Hide form
    memberForm.style.display =
        "none";

}


// ==========================================
// HTML SECURITY
// ==========================================

function escapeHTML(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// ATTRIBUTE SECURITY
// ==========================================

function escapeAttribute(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /\\/g,
            "\\\\"
        )

        .replace(
            /'/g,
            "\\'"
        )

        .replace(
            /"/g,
            "&quot;"
        );

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const response =
            await fetch(
                "/dashboard"
            );


        if (!response.ok) {

            throw new Error(
                "Could not load dashboard"
            );

        }


        const data =
            await response.json();


        // --------------------------------------
        // TOTAL MEMBERS
        // --------------------------------------

        const totalMembers =
            document.getElementById(
                "totalMembers"
            );


        if (totalMembers) {

            totalMembers.textContent =
                data.total_members;

        }


        // --------------------------------------
        // TOTAL DEPARTMENTS
        // --------------------------------------

        const totalDepartments =
            document.getElementById(
                "totalDepartments"
            );


        if (totalDepartments) {

            totalDepartments.textContent =
                data.department_counts
                    ? data.department_counts.length
                    : 0;

        }


        // --------------------------------------
        // DEPARTMENT LIST
        // --------------------------------------

        const departmentList =
            document.getElementById(
                "departmentList"
            );


        if (!departmentList) {

            return;

        }


        departmentList.innerHTML =
            "";


        if (
            !data.department_counts ||
            data.department_counts.length === 0
        ) {

            departmentList.innerHTML =
                "<p>No departments found.</p>";

            return;

        }


        data.department_counts.forEach(
            function (department) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "department-item";


                item.innerHTML = `

                    <span class="department-name">

                        ${escapeHTML(
                            department.department
                        )}

                    </span>


                    <span class="department-count">

                        ${department.total}

                    </span>

                `;


                departmentList.appendChild(
                    item
                );

            }
        );

    }


    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


// ==========================================
// SIDEBAR TOGGLE
// ==========================================

const sidebarToggle =
    document.getElementById(
        "sidebarToggle"
    );

const sidebar =
    document.getElementById(
        "sidebar"
    );


if (
    sidebarToggle &&
    sidebar
) {

    sidebarToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "collapsed"
            );

        }
    );

}


// ==========================================
// DARK / LIGHT MODE
// ==========================================

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "memberhub-theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


// ==========================================
// RESTORE SAVED THEME
// ==========================================

const savedTheme =
    localStorage.getItem(
        "memberhub-theme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

}


// ==========================================
// INITIAL LOAD
// ==========================================

loadMembers();

loadDashboard();