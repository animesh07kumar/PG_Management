-- CreateTable
CREATE TABLE `Staff` (
    `Admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Staff_username_key`(`username`),
    PRIMARY KEY (`Admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_number` INTEGER NOT NULL,
    `occupancy_cap` INTEGER NOT NULL,
    `tenant_id` INTEGER NULL,
    `january_rent_status` INTEGER NOT NULL,
    `february_rent_status` INTEGER NOT NULL,
    `march_rent_status` INTEGER NOT NULL,
    `april_rent_status` INTEGER NOT NULL,
    `may_rent_status` INTEGER NOT NULL,
    `june_rent_status` INTEGER NOT NULL,
    `july_rent_status` INTEGER NOT NULL,
    `august_rent_status` INTEGER NOT NULL,
    `september_rent_status` INTEGER NOT NULL,
    `october_rent_status` INTEGER NOT NULL,
    `november_rent_status` INTEGER NOT NULL,
    `december_rent_status` INTEGER NOT NULL,

    UNIQUE INDEX `Room_tenant_id_key`(`tenant_id`),
    PRIMARY KEY (`room_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tenant` (
    `tenant_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `aadhar_number` VARCHAR(191) NOT NULL,
    `room_rent` INTEGER NOT NULL,

    UNIQUE INDEX `Tenant_username_key`(`username`),
    UNIQUE INDEX `Tenant_aadhar_number_key`(`aadhar_number`),
    PRIMARY KEY (`tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Complaint` (
    `complaint_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`complaint_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `Tenant`(`tenant_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complaint` ADD CONSTRAINT `Complaint_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `Tenant`(`tenant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
