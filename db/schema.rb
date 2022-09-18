# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_18_185905) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "about", null: false
    t.string "website", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "size"
    t.string "revenue"
    t.string "headquarters"
    t.string "founded"
    t.string "industry"
    t.index ["name"], name: "index_companies_on_name", unique: true
  end

  create_table "follows", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_id"
    t.boolean "is_following", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_follows_on_company_id"
    t.index ["user_id", "company_id"], name: "index_follows_on_user_id_and_company_id", unique: true
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "interviews", force: :cascade do |t|
    t.bigint "company_id"
    t.bigint "user_id"
    t.string "experience", null: false
    t.string "title", null: false
    t.text "process", null: false
    t.string "difficulty", null: false
    t.string "offer", null: false
    t.text "questions", null: false
    t.text "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_interviews_on_company_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "company_id"
    t.bigint "user_id"
    t.integer "rating", null: false
    t.boolean "current_employee", default: false
    t.boolean "former_employee", default: false
    t.string "employment_status", null: false
    t.string "job_title"
    t.string "headline", null: false
    t.text "pros", null: false
    t.text "cons", null: false
    t.text "advice"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "user_id"], name: "index_reviews_on_company_id_and_user_id", unique: true
    t.index ["company_id"], name: "index_reviews_on_company_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "f_name", null: false
    t.string "l_name", null: false
    t.string "website"
    t.text "about_me"
    t.string "job_title", null: false
    t.text "skills"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "follows", "companies"
  add_foreign_key "follows", "users"
  add_foreign_key "interviews", "companies"
  add_foreign_key "interviews", "users"
  add_foreign_key "reviews", "companies"
  add_foreign_key "reviews", "users"
end
