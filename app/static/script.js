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
// GLOBAL DATA
// ==========================================

let allMembers = [];


// ==========================================
// OPEN ADD MEMBER FORM
// ==========================================

addMemberBtn.addEventListener("click", function () {

    clearForm();

    memberForm.style.display = "block";

    formTitle.textContent =
        "Add New Member";

    saveMemberBtn.textContent =
        "Save Member";

    membershipIdInput.disabled = false;

    memberForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ==========================================
// SAVE / UPDATE MEMBER
// ==========================================

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
        // CONTACT NUMBER VALIDATION

if (!/^\d{10}$/.test(contactNo)) {

    alert(
        "Contact number must contain exactly 10 digits."
    );

    contactNoInput.focus();

    return;
}

        const companyName =
            companyNameInput.value.trim();
// FORM VALIDATION

if (
    !membershipId ||
    !name ||
    !department ||
    !contactNo ||
    !companyName
) {
    alert("Please fill all fields.");
    return;
}

if (!/^\d{10}$/.test(contactNo)) {
    alert("Contact number must contain exactly 10 digits.");
    contactNoInput.focus();
    return;
}


        // VALIDATION

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
            // UPDATE
            // ==================================

            if (
                saveMemberBtn.dataset.editing
            ) {

                const originalMembershipId =
                    saveMemberBtn.dataset.editing;


                response = await fetch(
                    `/members/${encodeURIComponent(
                        originalMembershipId
                    )}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

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
            // ADD
            // ==================================

            else {

                response = await fetch(
                    "/members",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(member)
                    }
                );

            }


            const result =
                await response.json();


            // ERROR

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


            // SUCCESS

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


        populateDepartmentFilter(
            members
        );


        applyFilters();

    }


    catch (error) {

        console.error(
            "Error loading members:",
            error
        );


        memberList.innerHTML =
            "<p>Unable to load members.</p>";

    }

}


// ==========================================
// POPULATE DEPARTMENT FILTER
// ==========================================

function populateDepartmentFilter(
    members
) {

    if (!departmentFilter) {
        return;
    }


    const currentDepartment =
        departmentFilter.value;


    const departments = [
        ...new Set(
            members
                .map(
                    member =>
                        member.department
                )
                .filter(Boolean)
        )
    ];


    departments.sort();


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


    if (
        departments.includes(
            currentDepartment
        )
    ) {

        departmentFilter.value =
            currentDepartment;

    }

}


// ==========================================
// SEARCH + DEPARTMENT FILTER
// ==========================================

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedDepartment =
        departmentFilter
            ? departmentFilter.value
            : "";


    const filteredMembers =
        allMembers.filter(
            function (member) {

                const matchesSearch =

                    !searchText ||

                    String(
                        member.name || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        member.membership_id || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        member.department || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        member.contact_no || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        member.company_name || ""
                    )
                    .toLowerCase()
                    .includes(searchText);


                const matchesDepartment =
                    !selectedDepartment ||
                    member.department ===
                        selectedDepartment;


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

    memberList.innerHTML = "";


    if (
        !members ||
        members.length === 0
    ) {

        memberList.innerHTML =
            "<p>No members found.</p>";

        return;
    }


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
                    item.membership_id ===
                    membershipId
                );

            }
        );


    if (!member) {

        alert(
            "Member not found."
        );

        return;
    }


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
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        applyFilters();

    }
);


// ==========================================
// DEPARTMENT FILTER
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


    delete saveMemberBtn.dataset.editing;


    saveMemberBtn.textContent =
        "Save Member";


    formTitle.textContent =
        "Add New Member";


    membershipIdInput.disabled =
        false;


    memberForm.style.display =
        "none";

}


// ==========================================
// HTML SECURITY
// ==========================================

function escapeHTML(value) {

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

function escapeAttribute(value) {

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
            await fetch("/dashboard");


        if (!response.ok) {

            throw new Error(
                "Could not load dashboard"
            );

        }


        const data =
            await response.json();


        // TOTAL MEMBERS

        document.getElementById(
            "totalMembers"
        ).textContent =
            data.total_members;


        // TOTAL DEPARTMENTS

        document.getElementById(
            "totalDepartments"
        ).textContent =
            data.department_counts.length;


        // DEPARTMENT OVERVIEW

        const departmentList =
            document.getElementById(
                "departmentList"
            );


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


        document.getElementById(
            "departmentList"
        ).innerHTML =
            "<p>Unable to load dashboard.</p>";

    }

}


// ==========================================
// INITIAL LOAD
// ==========================================

loadMembers();

loadDashboard();